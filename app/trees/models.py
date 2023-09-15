class Node(object):
    def __init__(self, key, name="", sex="", mother="", father="", wife="", husband=""):
        self.__key = key
        self.__n = name
        self.__s = sex
        self.__m = mother
        self.__f = father
        self.__ux = wife
        self.__vir = husband

    def to_dict(self):
        node = {}
        node["key"] = self.__key
        node["n"] = self.__n
        node["s"] = self.__s
        node["m"] = self.__m
        node["f"] = self.__f
        node["ux"] = self.__ux
        node["vir"] = self.__vir
        return node