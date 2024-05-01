package com.iridium.routes

import io.ktor.server.routing.*

import com.iridium.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
//import io.ktor.server.routing.*

fun Route.atividadeRouting() {
    route("/atividade") {
        get {
            if (atividadeStorage.isNotEmpty()) {
                call.respond(atividadeStorage)
            } else {
                call.respondText("No atividades found", status = HttpStatusCode.OK)
            }
        }
        get("{id?}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing id",
                status = HttpStatusCode.BadRequest
            )
            val atividade =
                atividadeStorage.find { it.id == id } ?: return@get call.respondText(
                    "No atividade with id $id",
                    status = HttpStatusCode.NotFound
                )
            call.respond(atividade)
        }
        post {
            val atividade = call.receive<Atividade>()
            atividadeStorage.add(atividade)
            call.respondText("Atividade stored correctly", status = HttpStatusCode.Created)
        }
        delete("{id?}") {
            val id = call.parameters["id"] ?: return@delete call.respond(HttpStatusCode.BadRequest)
            if (atividadeStorage.removeIf { it.id == id }) {
                call.respondText("Atividade removed correctly", status = HttpStatusCode.Accepted)
            } else {
                call.respondText("Not Found", status = HttpStatusCode.NotFound)
            }
        }
    }
}