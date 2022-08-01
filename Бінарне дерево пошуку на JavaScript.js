class Node {
    constructor(name, number) {
        this.name       = name;
        this.number     = number;
        this.leftChild  = null;
        this.rightChild = null;
        this.parent     = null;
    }
}

class BinTree {
    constructor() {
        this.root = null;
    }

    insert(newNode) {
        // Якщо корінь дерева є пустим
        if (this.root == null) {
            this.root = newNode;
            return;
        }

        function _insert(currentNode) {
            if (newNode.number < currentNode.number) {
                if (currentNode.leftChild != null) {
                    _insert(currentNode.leftChild);
                } else {
                    newNode.parent        = currentNode;
                    currentNode.leftChild = newNode;
                }
            } else {
                if (currentNode.rightChild != null) {
                    _insert(currentNode.rightChild);
                } else {
                    newNode.parent         = currentNode;
                    currentNode.rightChild = newNode;
                }
            }
        }
        // Шукаємо куди вставити, починаємо з кореня
        _insert(this.root);
    }

    searchByNumber(number) {

        function _search(currentNode) {
            if (currentNode == null)
                return null;
            if (currentNode.number == number)
                return currentNode;
            if (currentNode.number > number)
                return _search(currentNode.leftChild);
            else
                return _search(currentNode.rightChild);
        }

        return _search(this.root);
    }

    deleteByNumber(number) {
        // Для видалення елементу з одним, або нулем, нащадків
        function deleteOneOrNoChildElem(node) {
            let newNode = null;
            if (node.leftChild)
                newNode = node.leftChild;
            else if (node.rightChild)
                newNode = node.rightChild;

            if (node.parent == null) {
                this.root = newNode;
            } else {
                if (node.parent.leftChild == node) {
                    node.parent.leftChild = newNode;
                } else {
                    node.parent.rightChild = newNode;
                }
            }
        }
        // Для видалення елементу з двума нащадками
        function deleteTwoChildElem(node) {

            let result = node.leftChild;
            if (result.rightChild) {
                while (result.rightChild) {
                    result = result.rightChild;
                }
            }
            deleteOneOrNoChildElem(result);
            
            let leftNodeChild = node.leftChild;
            let rightNodeChild = node.rightChild;

            if (node.parent == null) {
                result.leftChild = leftNodeChild;
                result.rightChild = rightNodeChild;
                this.root = result;
            } else {
                if (node.parent.leftChild == node) {
                    result.leftChild = leftNodeChild;
                    result.rightChild = rightNodeChild;
                    node.parent.leftChild = result;
                } else {
                    result.leftChild = leftNodeChild;
                    result.rightChild = rightNodeChild;
                    node.parent.rightChild = result;
                }
            }
        }

        let node = this.searchByNumber(number);

        if (node.leftChild && node.rightChild) {
            deleteTwoChildElem.call(this, node);
        }
        else {
            deleteOneOrNoChildElem.call(this, node);
        }

    }
}

let binTree = new BinTree();

/*
                ilya
            lera       --- видаляємо оцей.
    yaroslav    maks
sasha
*/

binTree.insert(new Node("ilya", "099229"));
binTree.insert(new Node("lera", "099227"));
binTree.insert(new Node("yaroslav", "099225"));
binTree.insert(new Node("sasha", "099224"));
binTree.insert(new Node("maks", "099228"));
binTree.deleteByNumber("099227");
console.log(binTree.searchByNumber("099228"));
console.log(binTree.root);
debugger;
