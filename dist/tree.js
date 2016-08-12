'use strict';

//dataJSON - loaded tree

// Tree
// =====================================================================================================================

function Tree(title) {
    this.version = '0';
    this.id = generateID();
    this.metadata = {
        'title': title
    };
    this.rootNode = null;

    // Generate uniq ID Helper Method
    // =============================================================================
    function generateID() {
        var d = new Date().getTime();
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });
        return id;
    };
}

// Set parent Method
// =============================================================================

// =====================================================================================================================
var rootTree = new Tree(dataJSON.tree.id);
console.log(rootTree);

// NODE
// =====================================================================================================================
function Node(title) {
    this.id = '1';
    this.metadata = {
        'title': title
    };

    this.children = [];
    this.parent = null;
}

// Set parent Method
// =============================================================================
Node.prototype.setParent = function (node) {
    this.parent = node;
};

// Get parent Method
// =============================================================================
Node.prototype.setParent = function () {
    return this.parent;
};
// Add children Method
// =============================================================================
Node.prototype.addChildren = function (nodeArr) {
    var self = this; //parent element

    nodeArr.map(function (node) {
        //setting guid
        node.id = self.id + self.children.length;
        // setting parent
        node.setParent(self);
        //adding child
        self.children[self.children.length] = node;
    });

    return new Promise(function (resolve, reject) {
        resolve(self.children); // no way, we should export only add children
    });
};

// Get children Method
// =============================================================================
Node.prototype.getChildren = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        resolve(self.children);
    });
};

// Delete children Method
// =============================================================================
Node.prototype.removeChildren = function () {
    this.children = [];
};

var root = new Node('root');
root.addChildren([new Node('child0'), new Node('child1'), new Node('child2')]).then(function (data) {
    console.log(data);
});
var children = root.getChildren();

console.log(root);
// console.log(children);

root.getChildren().then(function (data) {
    console.log(data);
});