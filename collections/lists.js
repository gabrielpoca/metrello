Lists  = new Mongo.Collection('lists');


// ALLOWS
Lists.allow({
    insert: function(userId, doc) { return doc.userId === userId; },
    update: function(userId, doc) { return doc.userId === userId; },
    remove: function(userId, doc) { return doc.userId === userId; },
});


// HELPERS
Lists.helpers({
    cards: function() {
        return Cards.find({ listId: this._id });
    },
    board: function() {
        return Boards.findOne(this.boardId);
    }
});


// LISTS BEFORE HOOK
Lists.before.insert(function(userId, doc) {
    doc.createdAt = new Date();
    doc.userId = userId;
    doc.closed = false;
});