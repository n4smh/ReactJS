import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorBySlug(slug) {
    return _authors.find((author) => author.id === Number.parseInt(slug));
  }
}

const author = new AuthorStore();
dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      author.emitChange();
      break;

    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((author) =>
        author.id === action.author.id ? action.author : author
      );
      author.emitChange();
      break;

    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      author.emitChange();
      break;

    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter((author) => {
        return author.id !== parseInt(action.id, 10);
      });

      author.emitChange();
      break;

    default:
    // Nothing to do here
  }
});

export default author;
