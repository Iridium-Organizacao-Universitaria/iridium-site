val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project

val koinKtor: String by project
val hikaricpVersion: String by project
val postgres_version: String by project
val h2_version: String by project
val exposed_version: String by project

//val ktor_version: String by project
//val kotlin_version: String by project
//val logback_version: String by project
//
////if using Postgres
////val postgresVersion: String by project
//val koinKtor: String by project
//val hikaricpVersion: String by project
//
////val kotlin_version: String by project
////val logback_version: String by project
//val postgres_version: String by project
//val h2_version: String by project
//val exposed_version: String by project

plugins {
    kotlin("jvm") version "1.9.24"
    id("io.ktor.plugin") version "2.3.10"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.9.24"
}

group = "com.iridium"
version = "0.0.1"

application {
    mainClass.set("io.ktor.server.netty.EngineMain")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-cors-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-call-logging-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-config-yaml:$ktor_version")
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("io.ktor:ktor-client-serialization:$ktor_version")
    implementation("io.ktor:ktor-client-content-negotiation:$ktor_version")
    implementation("com.h2database:h2:$h2_version")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("org.postgresql:postgresql:$postgres_version")

    implementation("io.insert-koin:koin-ktor:$koinKtor")
    implementation("com.zaxxer:HikariCP:$hikaricpVersion")

    testImplementation("io.ktor:ktor-server-test-host:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test:$kotlin_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}

//dependencies {
//    implementation("io.ktor:ktor-server-cors-jvm")
//    implementation("io.ktor:ktor-server-core-jvm")
//    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
//    implementation("io.ktor:ktor-server-content-negotiation-jvm")
//    implementation("com.h2database:h2:2.1.214")
//    implementation("org.jetbrains.exposed:exposed-core:0.41.1")
//    implementation("org.jetbrains.exposed:exposed-dao:0.38.2")
//    implementation("org.jetbrains.exposed:exposed-jdbc:0.41.1")
//    implementation("org.postgresql:postgresql:42.5.1")
//    implementation("com.h2database:h2:2.1.214")
//    implementation("io.ktor:ktor-server-call-logging-jvm")
//    implementation("io.ktor:ktor-server-netty-jvm")
//    implementation("ch.qos.logback:logback-classic:$logback_version")
//    implementation("io.ktor:ktor-server-config-yaml:2.3.10")
//    implementation("io.ktor:ktor-client-core:2.0.3")
//    implementation("io.ktor:ktor-client-cio:2.0.3") // ou outro engine, como ktor-client-apache ou ktor-client-okhttp
//    implementation("io.ktor:ktor-client-serialization:2.0.3")
//
////    testImplementation("io.ktor:ktor-server-tests-jvm")
////    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
////    testImplementation("org.jetbrains.kotlin:kotlin-test")
////    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
////    testImplementation("io.ktor:ktor-server-testing:$kotlin_version")
//
//
//
//    implementation("io.ktor:ktor-server-cors:$ktor_version")
//    //if using Postgres
////    implementation("org.postgresql:postgresql:$postgresVersion")
//    // Koin for Ktor
//    implementation("io.insert-koin:koin-ktor:$koinKtor")
//    //connection pooling
//    implementation("com.zaxxer:HikariCP:$hikaricpVersion")
//
////    implementation("io.ktor:ktor-server-core-jvm")
////    implementation("io.ktor:ktor-server-host-common-jvm")
////    implementation("io.ktor:ktor-server-status-pages-jvm")
////    implementation("io.ktor:ktor-serialization-kotlinx-json-jvm")
////    implementation("io.ktor:ktor-server-content-negotiation-jvm")
//    implementation("org.postgresql:postgresql:$postgres_version")
////    implementation("com.h2database:h2:$h2_version")
////    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
////    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
////    implementation("io.ktor:ktor-server-netty-jvm")
////    implementation("ch.qos.logback:logback-classic:$logback_version")
////    implementation("io.ktor:ktor-server-config-yaml")
////    testImplementation("io.ktor:ktor-server-tests-jvm")
////    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
//
//    testImplementation("io.ktor:ktor-server-test-host:$ktor_version")
//    testImplementation("org.jetbrains.kotlin:kotlin-test:$kotlin_version")
//}
