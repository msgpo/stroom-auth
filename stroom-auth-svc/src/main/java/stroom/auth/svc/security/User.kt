package stroom.auth.svc.security

import java.security.Principal

class User(private var name: String, val jwt: String) : Principal {
    override fun getName(): String {
        return name
    }
}
