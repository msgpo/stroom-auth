/*
 * This file is generated by jOOQ.
*/
package stroom.db.auth;


import javax.annotation.Generated;

import org.jooq.Identity;
import org.jooq.UniqueKey;
import org.jooq.impl.AbstractKeys;

import stroom.db.auth.tables.Users;
import stroom.db.auth.tables.records.UsersRecord;


/**
 * A class modelling foreign key relationships between tables of the <code>auth</code> 
 * schema
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.3"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // IDENTITY definitions
    // -------------------------------------------------------------------------

    public static final Identity<UsersRecord, Integer> IDENTITY_USERS = Identities0.IDENTITY_USERS;

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<UsersRecord> KEY_USERS_PRIMARY = UniqueKeys0.KEY_USERS_PRIMARY;
    public static final UniqueKey<UsersRecord> KEY_USERS_EMAIL = UniqueKeys0.KEY_USERS_EMAIL;

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Identities0 extends AbstractKeys {
        public static Identity<UsersRecord, Integer> IDENTITY_USERS = createIdentity(Users.USERS, Users.USERS.ID);
    }

    private static class UniqueKeys0 extends AbstractKeys {
        public static final UniqueKey<UsersRecord> KEY_USERS_PRIMARY = createUniqueKey(Users.USERS, "KEY_users_PRIMARY", Users.USERS.ID);
        public static final UniqueKey<UsersRecord> KEY_USERS_EMAIL = createUniqueKey(Users.USERS, "KEY_users_email", Users.USERS.EMAIL);
    }
}
