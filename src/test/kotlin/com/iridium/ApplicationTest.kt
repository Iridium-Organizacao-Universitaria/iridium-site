package com.iridium

import com.iridium.plugins.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.json
import io.ktor.server.testing.*
import kotlin.test.*

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

class ApplicationTest {
    @Test
    fun invalidPriorityProduces400() = testApplication {
        val response = client.get("/disciplinas/byPriority/Invalid")
        assertEquals(HttpStatusCode.BadRequest, response.status)
    }

    @Test
    fun unusedPriorityProduces404() = testApplication {
        application {
            module()
        }

        val response = client.get("/disciplinas/byPriority/Vital")
        assertEquals(HttpStatusCode.NotFound, response.status)
    }

    @Test
    fun newDisciplinasCanBeAdded() = testApplication {
        application {
            module()
        }

        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }

        val disciplina = Disciplina("materiateste", "professorteste")
        val response1 = client.post("/disciplinas") {
            header(
                HttpHeaders.ContentType,
                ContentType.Application.Json
            )

            setBody(disciplina)
        }
        assertEquals(HttpStatusCode.NoContent, response1.status)

        val response2 = client.get("/disciplinas")
        assertEquals(HttpStatusCode.OK, response2.status)

        val disciplinaNames = response2
            .body<List<Disciplina>>()
            .map { it.name }

        assertContains(disciplinaNames, "swimming")
    }
}