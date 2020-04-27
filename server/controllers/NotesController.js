import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { noteService } from '../services/NoteService';



//PUBLIC
export class NotesController extends BaseController {
  constructor() {
    super("api/bugs/:bugId/notes")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      // .get('/:id/lists', this.getBoardListsByBoardId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await noteService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await noteService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  //getBoardListsByBoardId
  // async getBoardListsByBoardId(req, res, next) {
  //   try {
  //     let data = await boardService.getBoardListsByBoardId(req.params.id, req.userInfo.email)
  //     return res.send(data)
  //   } catch (error) { next(error) }
  // }


  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await noteService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await noteService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}