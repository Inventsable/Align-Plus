console.log("Host is online");

function executeAction(name, opts) {
  let opts = JSON.parse(opts),
    selection = [];
  runAction(name);
}

function distributeHorizontalBySpacing(spacing) {
  alert("Distribute horizontal");
  alert(spacing);
}

function distributeVerticalBySpacing(spacing) {
  alert("Distribute vertical");
  alert(spacing);
}

function getBoundingBoxOfSelection() {
  let selection = get("selection");
  let x1 = selection.map((item) => item.visibleBounds[0]).min();
  let x2 = selection.map((item) => item.visibleBounds[2]).max();
  let y1 = selection.map((item) => item.visibleBounds[1]).max();
  let y2 = selection.map((item) => item.visibleBounds[3]).min();
  return [x1, y1, x2, y2];
}

function selectInverse(items) {
  get("pageItems")
    .filter((item) => {
      return !items.includes(item.uuid);
    })
    .forEach((item) => {
      item.selected = true;
    });
}

function runAction(name) {
  let action = getActionByName(name);
  var tmp = File(Folder.desktop + "/temp.aia");
  tmp.open("w");
  tmp.write(action);
  tmp.close();
  app.loadAction(tmp);
  app.doScript(name, "Align-Plus", false);
  tmp.remove();
  app.unloadAction("Align-Plus", "");
}

function getActionByName(name) {
  if (name == "s-align-hor-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		732d616c69676e2d686f722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 23" +
      "				486f72697a6f6e74616c20416c69676e2043656e746572" +
      "			]" +
      "			/value 2" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-align-hor-left")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 16" +
      "		732d616c69676e2d686f722d6c656674" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				486f72697a6f6e74616c20416c69676e204c656674" +
      "			]" +
      "			/value 1" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-align-hor-right")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 17" +
      "		732d616c69676e2d686f722d7269676874" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 22" +
      "				486f72697a6f6e74616c20416c69676e205269676874" +
      "			]" +
      "			/value 3" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-align-ver-top")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 15" +
      "		732d616c69676e2d7665722d746f70" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 18" +
      "				566572746963616c20416c69676e20546f70" +
      "			]" +
      "			/value 4" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-align-ver-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		732d616c69676e2d7665722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				566572746963616c20416c69676e2043656e746572" +
      "			]" +
      "			/value 5" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-align-ver-bottom")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		732d616c69676e2d7665722d626f74746f6d" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				566572746963616c20416c69676e20426f74746f6d" +
      "			]" +
      "			/value 6" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-ver-top")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 20" +
      "		732d646973747269627574652d7665722d746f70" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 23" +
      "				566572746963616c204469737472696275746520546f70" +
      "			]" +
      "			/value 7" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-ver-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		732d646973747269627574652d7665722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				566572746963616c20446973747269627574652043656e746572" +
      "			]" +
      "			/value 8" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-ver-bottom")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		732d646973747269627574652d7665722d626f74746f6d" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				566572746963616c204469737472696275746520426f74746f6d" +
      "			]" +
      "			/value 9" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-hor-left")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 21" +
      "		732d646973747269627574652d686f722d6c656674" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				486f72697a6f6e74616c2044697374726962757465204c656674" +
      "			]" +
      "			/value 10" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-hor-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		732d646973747269627574652d686f722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 28" +
      "				486f72697a6f6e74616c20446973747269627574652043656e746572" +
      "			]" +
      "			/value 11" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "s-distribute-hor-right")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 22" +
      "		732d646973747269627574652d686f722d7269676874" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 27" +
      "				486f72697a6f6e74616c2044697374726962757465205269676874" +
      "			]" +
      "			/value 12" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-hor-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		612d616c69676e2d686f722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 23" +
      "				486f72697a6f6e74616c20416c69676e2043656e746572" +
      "			]" +
      "			/value 2" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-hor-left")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 16" +
      "		612d616c69676e2d686f722d6c656674" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				486f72697a6f6e74616c20416c69676e204c656674" +
      "			]" +
      "			/value 1" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-hor-right")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 17" +
      "		612d616c69676e2d686f722d7269676874" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 22" +
      "				486f72697a6f6e74616c20416c69676e205269676874" +
      "			]" +
      "			/value 3" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-ver-top")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 15" +
      "		612d616c69676e2d7665722d746f70" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 18" +
      "				566572746963616c20416c69676e20546f70" +
      "			]" +
      "			/value 4" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-ver-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		612d616c69676e2d7665722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				566572746963616c20416c69676e2043656e746572" +
      "			]" +
      "			/value 5" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-align-ver-bottom")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 18" +
      "		612d616c69676e2d7665722d626f74746f6d" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 21" +
      "				566572746963616c20416c69676e20426f74746f6d" +
      "			]" +
      "			/value 6" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-ver-top")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 20" +
      "		612d646973747269627574652d7665722d746f70" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 23" +
      "				566572746963616c204469737472696275746520546f70" +
      "			]" +
      "			/value 7" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-ver-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		612d646973747269627574652d7665722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				566572746963616c20446973747269627574652043656e746572" +
      "			]" +
      "			/value 8" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-ver-bottom")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		612d646973747269627574652d7665722d626f74746f6d" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				566572746963616c204469737472696275746520426f74746f6d" +
      "			]" +
      "			/value 9" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-hor-left")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 21" +
      "		612d646973747269627574652d686f722d6c656674" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 26" +
      "				486f72697a6f6e74616c2044697374726962757465204c656674" +
      "			]" +
      "			/value 10" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-hor-center")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 23" +
      "		612d646973747269627574652d686f722d63656e746572" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 28" +
      "				486f72697a6f6e74616c20446973747269627574652043656e746572" +
      "			]" +
      "			/value 11" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
  else if (name == "a-distribute-hor-right")
    return (
      "/version 3" +
      "/name [ 10" +
      "	416c69676e2d506c7573" +
      "]" +
      "/isOpen 1" +
      "/actionCount 1" +
      "/action-1 {" +
      "	/name [ 22" +
      "		612d646973747269627574652d686f722d7269676874" +
      "	]" +
      "	/keyIndex 0" +
      "	/colorIndex 0" +
      "	/isOpen 0" +
      "	/eventCount 1" +
      "	/event-1 {" +
      "		/useRulersIn1stQuadrant 0" +
      "		/internalName (ai_plugin_alignPalette)" +
      "		/localizedName [ 9" +
      "			416c69676e6d656e74" +
      "		]" +
      "		/isOpen 0" +
      "		/isOn 1" +
      "		/hasDialog 0" +
      "		/parameterCount 1" +
      "		/parameter-1 {" +
      "			/key 1954115685" +
      "			/showInPalette -1" +
      "			/type (enumerated)" +
      "			/name [ 27" +
      "				486f72697a6f6e74616c2044697374726962757465205269676874" +
      "			]" +
      "			/value 12" +
      "		}" +
      "	}" +
      "}" +
      ""
    );
}

console.log("Host is fully loaded");
