// STYLING SECTION BEGIN
// This section provides a common style for most of the TextBlocks.
// Some of these values may be overridden in a particular snippet.
const cssColors = {
  "black": "#0e2229",
  "darkbrown": "#362418",
  "orange": "#FC440F",
  "darkblue": "#1F01B9",
  "cyan": "#2E8087",
  "white": "#ffecbd",
  "gray": "#7C9299",
}

const gradient = {
  "first":"#f5f5f5",
  "second":"#f5f5f5",
  "third":"#f5f5f5",
  "fourth":"#f5f5f5",
  "fifth":"#f5f5f5"
}

const levelColors = [
  gradient.first,
  gradient.second,
  gradient.third,
  gradient.fourth,
  gradient.fifth
];

function textStyle() {
  return { font: "10pt  Open Sans", stroke: "white" };
}
// STYLING SECTION END

function init() {
  // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
  // For details, see https://gojs.net/latest/intro/buildingObjects.html
  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    new go.Diagram("myDiagramDiv", // must be the ID or reference to div
      {
        allowCopy: false,
        allowDelete: false,
        initialAutoScale: go.Diagram.Uniform,
        maxSelectionCount: 99, // users can select only one part at a time
        validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
        layout:
          $(go.TreeLayout,
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        "undoManager.isEnabled": true // enable undo & redo
      });

  // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
  myDiagram.layout.commitNodes = function () {  // method override must be function, not =>
    go.TreeLayout.prototype.commitNodes.call(this);  // do the standard behavior
    // then go through all of the vertexes and set their corresponding node's Shape.fill
    // to a brush dependent on the TreeVertex.level value
    myDiagram.layout.network.vertexes.each(v => {
      if (v.node) {
        const level = v.level % (levelColors.length);
        const color = levelColors[level];
        const shape = v.node.findObject("SHAPE");
        if (shape) shape.stroke = $(go.Brush, "Linear", { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
      }
    });
  };

  // this is used to determine feedback during drags
  function mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false;  // must be a Node
    if (node1 === node2) return false;  // cannot work for yourself
    if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
    return true;
  }

  // define the Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Spot",
      {
        selectionObjectName: "BODY",
        mouseEnter: (e, node) => node.findObject("BUTTONX").opacity = 1,
        mouseLeave: (e, node) => node.findObject("BUTTONX").opacity = 0,
        // handle dragging a Node onto a Node to (maybe) change the reporting relationship
        mouseDragEnter: (e, node, prev) => {
          const diagram = node.diagram;
          const selnode = diagram.selection.first();
          if (!mayWorkFor(selnode, node)) return;
          const shape = node.findObject("SHAPE");
          if (shape) {
            shape._prevFill = shape.fill;  // remember the original brush
            shape.fill = "darkred";
          }
        },
        mouseDragLeave: (e, node, next) => {
          const shape = node.findObject("SHAPE");
          if (shape && shape._prevFill) {
            shape.fill = shape._prevFill;  // restore the original brush
          }
        },
        mouseDrop: (e, node) => {
          const diagram = node.diagram;
          const selnode = diagram.selection.first();  // assume just one Node in selection
          if (mayWorkFor(selnode, node)) {
            // find any existing link into the selected node
            const link = selnode.findTreeParentLink();
            if (link !== null) {  // reconnect any existing link
              link.fromNode = node;
            } else {  // else create a new link
              diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
            }
          }
        }
      },
      // for sorting, have the Node.text be the data.name
      new go.Binding("text", "name"),
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected
      new go.Binding("layerName", "isSelected", sel => sel ? "Foreground" : "").ofObject(),
      $(go.Panel, "Auto",
        { name: "BODY" },
        // define the node's outer shape
        $(go.Shape, "RoundedRectangle",
          { name: "SHAPE", fill: cssColors.cyan, stroke: 'white', strokeWidth: 3.5, portId: "" }),
        $(go.Panel, "Horizontal",
          // picture can go here
          $(go.Panel, "Table",
            {
              minSize: new go.Size(130, NaN),
              maxSize: new go.Size(150, NaN),
              margin: new go.Margin(6, 10, 0, 6),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, textStyle(),  // the name
              {
                name: "NAMETB",
                row: 0, column: 0, columnSpan: 5,
                font: "12pt Josefin Sans",
                editable: true, isMultiline: false,
                minSize: new go.Size(50, 16)
              },
              new go.Binding("text", "name").makeTwoWay()),
            $(go.TextBlock, "Born: ", textStyle(),
              { row: 1, column: 0 }),
            $(go.TextBlock, textStyle(),
              {
                row: 1, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(50, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding("text", "title").makeTwoWay()),
            $(go.TextBlock, textStyle(),
              { row: 2, column: 0 },
              new go.Binding("text", "key", v => "Died: " + v)),
            $(go.TextBlock, textStyle(),  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: "italic 9pt Josefin Sans",
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(100, 14)
              },
              new go.Binding("text", "comments").makeTwoWay())
          ) // end Table Panel
        ) // end Horizontal Panel
      ), // end Auto Panel
      new go.Binding("isTreeExpanded").makeTwoWay(),
      $("TreeExpanderButton",
        {
          name: "BUTTONX", alignment: go.Spot.Bottom, opacity: 0,  // initially not visible
          "_treeExpandedFigure": "TriangleUp",
          "_treeCollapsedFigure": "TriangleDown"
        },
        // button is visible either when node is selected or on mouse-over
        new go.Binding("opacity", "isSelected", s => s ? 1 : 0).ofObject()
      )
    );  // end Node, a Spot Panel

  // define the Link template
  myDiagram.linkTemplate =
    $(go.Link, go.Link.Orthogonal,
      { layerName: "Background", corner: 5 },
      $(go.Shape, { strokeWidth: 1.5, stroke: cssColors.darkbrown }));  // the link shape

  // read in the JSON-format data from the "mySavedModel" element
  load();

  // Setup zoom to fit button
  //document.getElementById('SaveButton').addEventListener('click', () => save());

  document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.commandHandler.zoomToFit());

  document.getElementById('fullscreen').addEventListener('click', () => {
    document.getElementById("myDiagramDiv").requestFullscreen()
    setTimeout(() => {
      myDiagram.scale = 1;
      myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(1));
    }, 500)
  })

  document.getElementById('centerRoot').addEventListener('click', () => {
    myDiagram.scale = 1;
    myDiagram.commandHandler.scrollToPart(myDiagram.findNodeForKey(1));
  });
} // end init

// Show the diagram's model in JSON format
function save() {
  document.getElementById("mySavedModel").value = myDiagram.model.toJson();
  myDiagram.isModified = false;
}
function load() {
  myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  // make sure new data keys are unique positive integers
  let lastkey = 1;
  myDiagram.model.makeUniqueKeyFunction = (model, data) => {
    let k = data.key || lastkey;
    while (model.findNodeDataForKey(k)) k++;
    data.key = lastkey = k;
    return k;
  };
}

window.addEventListener('DOMContentLoaded', init);