//package com.iridium.routes
//
//import io.ktor.server.routing.*
//
//import com.iridium.models.*
//import io.ktor.http.*
//import io.ktor.server.application.*
//import io.ktor.server.request.*
//import io.ktor.server.response.*
//import io.ktor.server.routing.*
//import Disciplina
//
//fun Route.disciplinaRouting() {
//    route("/disciplina") {
//        get {
//            if (disciplinaStorage.isNotEmpty()) {
//                call.respond(disciplinaStorage)
//            } else {
//                call.respondText("No disciplinas found", status = HttpStatusCode.OK)
//            }
//        }
//        get("{id?}") {
//            val id = call.parameters["id"] ?: return@get call.respondText(
//                "Missing id",
//                status = HttpStatusCode.BadRequest
//            )
//            val disciplina =
//                disciplinaStorage.find { it.sigla == id } ?: return@get call.respondText(
//                    "No disciplina with id $id",
//                    status = HttpStatusCode.NotFound
//                )
//            call.respond(disciplina)
//        }
//        post {
//            val disciplina = call.receive<Disciplina>()
//            disciplinaStorage.add(disciplina)
//            call.respondText("Disciplina stored correctly", status = HttpStatusCode.Created)
//        }
//        delete("{id?}") {
//            val id = call.parameters["id"] ?: return@delete call.respond(HttpStatusCode.BadRequest)
//            if (disciplinaStorage.removeIf { it.sigla == id }) {
//                call.respondText("Disciplina removed correctly", status = HttpStatusCode.Accepted)
//            } else {
//                call.respondText("Not Found", status = HttpStatusCode.NotFound)
//            }
//        }
//    }
//}