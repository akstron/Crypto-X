class OrderNode{
    constructor(order){
        this.order = order;
        this.next = null;
    }
};

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        return (this.head === null);
    }

    pushBack(currentOrder){
        const order = new OrderNode(currentOrder);

        if(this.head === null){
            this.head = order;
            this.tail = order;
        } 
        else {
            this.tail.next = order;
            this.tail = order;
        }
    }

    pushFront(currentOrder){
        const order = new OrderNode(currentOrder);

        if(this.head === null){
            this.head = order;
            this.tail = order;
        }
        else {
            order.next = this.head;
            this.head = order;
        }
    }

    getFront(){
        if(this.head === null){
            throw new Error('List empty!');
        }

        return this.head;
    }

    popFront(){
        if(this.head === null){
            throw new Error('List empty!');
        }

        const order = this.head;
        this.head = this.head.next;
        return order;
    }

    /**
     * For debugging only
     */
    inorder(){
        var current = this.head;
        while(current !== null){
            process.stdout.write('{' + current.order.completed + '/' + current.order.quantity + '}' + '<---  ');
            current = current.next;
        }
        console.log('\n');
    }
}

module.exports = LinkedList;