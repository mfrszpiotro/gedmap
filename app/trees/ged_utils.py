import os, json
from gedcom.parser import Parser
from gedcom.element.individual import IndividualElement, NotAnActualIndividualError
from gedcom.element.family import FamilyElement
from gedcom.tags import (
    GEDCOM_TAG_FAMILY_SPOUSE,
    GEDCOM_TAG_FAMILY_CHILD,
    GEDCOM_TAG_HUSBAND,
    GEDCOM_TAG_WIFE,
)

basedir = os.path.abspath(os.path.dirname(__file__))
ALLOWED_EXTENSIONS = {"ged"}
UPLOAD_FOLDER = os.path.join(basedir, "gedcoms")
EXAMPLE_FILE = "kennedy_family_example.ged"

class InvalidParser(Exception):
    pass


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def _get_id_last_wife(parser, family):
    if isinstance(parser, Parser):
        wife_list = parser.get_family_members(family, GEDCOM_TAG_WIFE)
        return _get_unique_id(wife_list.pop()) if wife_list else -1
    else: 
        raise InvalidParser
    return ""


def _get_id_last_husband(parser, family):
    if isinstance(parser, Parser):
        husb_list = parser.get_family_members(family, GEDCOM_TAG_HUSBAND)
        return _get_unique_id(husb_list.pop()) if husb_list else -1
    else: 
        raise InvalidParser
    return -1


def _get_id_mother(parents):
    for parent in parents:
        if isinstance(parent, IndividualElement):
            if parent.get_gender() == "F":
                return _get_unique_id(parent)
        else: raise NotAnActualIndividualError
    return -1


def _get_id_father(parents):
    id = ""
    for parent in parents:
        if isinstance(parent, IndividualElement):
            if parent.get_gender() == "M":
                return _get_unique_id(parent)
        else: raise NotAnActualIndividualError
    return -1


def _get_unique_id(element):
    if isinstance(element, IndividualElement):
        ptr = str(element.get_pointer()).replace("@", "")
        return int(ptr.replace("I", ""))
    raise NotAnActualIndividualError

def get_view_model(filename):
    parser = Parser()
    parser.parse_file(os.path.join(UPLOAD_FOLDER, filename), False)
    elements = parser.get_root_child_elements()
    nodes = []
    for element in elements:
        if isinstance(element, IndividualElement):
            node = {}
            gender = element.get_gender()
            node["key"] = _get_unique_id(element)
            (first, last) = element.get_name()
            node["n"] = first + " " + last
            node["fn"] = first
            node["ln"] = last
            node["s"] = gender
            node["gs"] = "\u2640" if gender == "F" else "\u2642"
            parents = parser.get_parents(element)
            node["m"] = _get_id_mother(parents)
            node["f"] = _get_id_father(parents)
            fam_list = parser.get_families(element, GEDCOM_TAG_FAMILY_SPOUSE)
            fam = fam_list.pop() if fam_list else None
            node["ux"] = (
                _get_id_last_wife(parser, fam) if fam and gender == "M" else -1
            )
            node["vir"] = (
                _get_id_last_husband(parser, fam) if fam and gender == "F" else -1
            )
            nodes.append(node)
    return json.dumps(nodes, indent=4)
