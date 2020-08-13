console.log("HOST LOADING...");
function alignTo(params, opts) {
    if (!app.selection.length)
        return null;
    params = JSON.parse(params);
    opts = JSON.parse(opts);
    var parentRect = /artboard/i.test(params.type)
        ? getArtboardBoundingClientRect()
        : getSelectionBoundingClientRect();
    var target = parentRect[params.direction];
    getValidSelectionItems().forEach(function (item) {
        alignHandler(item, params.direction, target, opts);
    });
}
function getRealSelectionLength() {
    return getValidSelectionItems().length;
}
function distributeTo(params, opts) {
    alert("Not yet supported");
}
function alignHandler(item, key, value, opts) {
    if (/point/i.test(item.typename))
        alignPointTo(item, key, value, opts);
    else
        alignItemTo(item, key, value, opts);
}
function getHandleOffsets(point) {
    return {
        left: [
            (point.anchor[0] - point.leftDirection[0]) * -1,
            (point.anchor[1] - point.leftDirection[1]) * -1,
        ],
        right: [
            (point.anchor[0] - point.rightDirection[0]) * -1,
            (point.anchor[1] - point.rightDirection[1]) * -1,
        ]
    };
}
function alignPointTo(point, key, value, opts) {
    var handleOffsets = getHandleOffsets(point);
    var isHorizontal = /left|right/i.test(key);
    if (/number/i.test(typeof value)) {
        var computedValue = isHorizontal
            ? [value, point.anchor[1]]
            : [point.anchor[0], value];
        point.anchor = computedValue;
        if (opts.alignHandles) {
            point.leftDirection = [
                computedValue[0] + handleOffsets.left[0],
                computedValue[1] + handleOffsets.left[1],
            ];
            point.rightDirection = [
                computedValue[0] + handleOffsets.right[0],
                computedValue[1] + handleOffsets.right[1],
            ];
        }
    }
    else if (/center/i.test(key)) {
        var computedValue = [value[0], value[1] * -1];
        point.anchor = computedValue;
        if (opts.alignHandles) {
            point.leftDirection = [
                computedValue[0] + handleOffsets.left[0],
                computedValue[1] + handleOffsets.left[1],
            ];
            point.rightDirection = [
                computedValue[0] + handleOffsets.right[0],
                computedValue[1] + handleOffsets.right[1],
            ];
        }
    }
}
function alignItemTo(obj, key, value, opts) {
    var rect = getBoundingClientRect(obj), target = rect[key];
    var isHorizontal = /left|right/.test(key), isCenterpoint = !/number/i.test(typeof target);
    if (isCenterpoint) {
        var xOffset = rect.left - rect.center[0];
        var yOffset = rect.top - rect.center[1];
        var computedValue = [xOffset + value[0], (value[1] + yOffset) * -1];
        obj.position = computedValue;
    }
    else {
        var offset = isHorizontal ? rect.left - target : rect.top - target;
        var computedValue = value + offset;
        computedValue = isHorizontal ? computedValue : computedValue * -1;
        obj.position = isHorizontal
            ? [computedValue, obj.position[1]]
            : [obj.position[0], computedValue];
    }
}
function getValidSelectionItems() {
    if (!app.selection.length)
        return null;
    return get("selection")
        .map(function (item) {
        if (!/^pathitem/i.test(item.typename) || !hasIsolatedPointSelection(item))
            return item;
        else
            return get("pathPoints", item).filter(function (point) {
                return point.selected == PathPointSelection.ANCHORPOINT;
            });
    })
        .flat();
}
function getSelectionBoundingBox() {
    if (!app.selection.length)
        return null;
    var wholeSelection = get("selection").filter(function (item) {
        return (!/^pathitem/i.test(item.typename) || !hasIsolatedPointSelection(item));
    });
    var pointSelection = get("selection").filter(function (item) {
        return /^pathitem/i.test(item.typename) && hasIsolatedPointSelection(item);
    });
    var pointSelectionAnchors = pointSelection.map(function (item) {
        return get("pathPoints", item)
            .filter(function (point) {
            return point.selected == PathPointSelection.ANCHORPOINT;
        })
            .map(function (point) {
            return point.anchor;
        });
    });
    var pointXs = pointSelectionAnchors
        .map(function (targ) {
        return targ.map(function (pointX) {
            return pointX[0];
        });
    })
        .flat();
    var pointYs = pointSelectionAnchors
        .map(function (targ) {
        return targ.map(function (pointY) {
            return pointY[1];
        });
    })
        .flat();
    var x1 = []
        .concat(wholeSelection.map(function (item) { return item.geometricBounds[0]; }), pointXs)
        .min();
    var x2 = []
        .concat(wholeSelection.map(function (item) { return item.geometricBounds[2]; }), pointXs)
        .max();
    var y1 = []
        .concat(wholeSelection.map(function (item) { return item.geometricBounds[1]; }), pointYs)
        .max();
    var y2 = []
        .concat(wholeSelection.map(function (item) { return item.geometricBounds[3]; }), pointYs)
        .min();
    return [x1, y1, x2, y2];
}
function hasIsolatedPointSelection(item) {
    return (get("pathPoints", item).filter(function (point) {
        return point.selected == PathPointSelection.ANCHORPOINT;
    }).length !== item.pathPoints.length);
}
function getArtboardBoundingClientRect() {
    var activeBoard = app.activeDocument.artboards[app.activeDocument.artboards.getActiveArtboardIndex()];
    var rect = activeBoard.artboardRect;
    var data = {
        left: rect[0],
        top: rect[1] * -1,
        right: rect[2],
        bottom: rect[3] * -1,
        width: rect[2] - rect[0],
        height: (rect[3] - rect[1]) * -1
    };
    return {
        left: data.left,
        top: data.top,
        right: data.right,
        bottom: data.bottom,
        width: data.width,
        height: data.height,
        center: [data.left + data.width / 2, data.top + data.height / 2]
    };
}
function getBoundingClientRect(target) {
    var rect = target.geometricBounds;
    var data = {
        left: rect[0],
        top: rect[1] * -1,
        right: rect[2],
        bottom: rect[3] * -1,
        width: rect[2] - rect[0],
        height: (rect[3] - rect[1]) * -1
    };
    return {
        left: data.left,
        top: data.top,
        right: data.right,
        bottom: data.bottom,
        width: data.width,
        height: data.height,
        center: [data.left + data.width / 2, data.top + data.height / 2]
    };
}
function getSelectionBoundingClientRect(rect) {
    if (!rect || arguments.length < 1)
        rect = getSelectionBoundingBox();
    var data = {
        left: rect[0],
        top: rect[1] * -1,
        right: rect[2],
        bottom: rect[3] * -1,
        width: rect[2] - rect[0],
        height: (rect[3] - rect[1]) * -1
    };
    return {
        left: data.left,
        top: data.top,
        right: data.right,
        bottom: data.bottom,
        width: data.width,
        height: data.height,
        center: [data.left + data.width / 2, data.top + data.height / 2]
    };
}
console.log("HOST ONLINE");
