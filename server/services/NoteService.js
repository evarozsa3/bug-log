import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { bugService } from "./BugService"


class NoteService {
  async getAll(userEmail, bugId) {
    return await dbContext.Notes.find({ bug: bugId, creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    debugger
    let data = await dbContext.Notes.findById({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  // async getBoardListsByBoardId(boardId, userEmail) {
  //   let data = await dbContext.Notes.find({ boardId: boardId, creatorEmail: userEmail })
  //   if (!data) {
  //     throw new BadRequest("Invalid ID or you do not own this board")
  //   }
  //   return data
  // }

  async create(rawData) {
    let bug = await dbContext.Bugs.findById(rawData.bug)
    if (bug.closed) {
      throw new BadRequest("cant add a note bug is closed")
    }
    let data = await dbContext.Notes.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const noteService = new NoteService()