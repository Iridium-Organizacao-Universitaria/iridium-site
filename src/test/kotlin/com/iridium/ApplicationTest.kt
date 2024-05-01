import com.iridium.models.*
import com.iridium.routes.*

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.testing.*
import org.junit.Assert.assertEquals
import org.junit.Test
import kotlin.test.assertContains

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
//        application {
//            module()
//        }
        val response = client.get("/")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("Iridium - Organização Universitária", response.bodyAsText())
    }

    @Test
    fun testNewEndpoint() = testApplication {
//    application {
//        module()
//    }
        val response = client.get("/test1")
        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("html", response.contentType()?.contentSubtype)
        assertContains(response.bodyAsText(), "Página de test1")
    }
}