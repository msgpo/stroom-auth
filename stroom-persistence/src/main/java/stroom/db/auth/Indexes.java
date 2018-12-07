/*
 * This file is generated by jOOQ.
 */
package stroom.db.auth;


import javax.annotation.Generated;

import org.jooq.Index;
import org.jooq.OrderField;
import org.jooq.impl.Internal;

import stroom.db.auth.tables.JsonWebKey;
import stroom.db.auth.tables.TokenTypes;
import stroom.db.auth.tables.Tokens;
import stroom.db.auth.tables.Users;


/**
 * A class modelling indexes of tables of the <code>auth</code> schema.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Indexes {

    // -------------------------------------------------------------------------
    // INDEX definitions
    // -------------------------------------------------------------------------

    public static final Index JSON_WEB_KEY_KEYID = Indexes0.JSON_WEB_KEY_KEYID;
    public static final Index JSON_WEB_KEY_PRIMARY = Indexes0.JSON_WEB_KEY_PRIMARY;
    public static final Index TOKENS_FK_ISSUED_BY_USER = Indexes0.TOKENS_FK_ISSUED_BY_USER;
    public static final Index TOKENS_FK_ISSUED_TO = Indexes0.TOKENS_FK_ISSUED_TO;
    public static final Index TOKENS_FK_TOKEN_TYPE_ID = Indexes0.TOKENS_FK_TOKEN_TYPE_ID;
    public static final Index TOKENS_FK_UPDATED_BY_USER = Indexes0.TOKENS_FK_UPDATED_BY_USER;
    public static final Index TOKENS_ID = Indexes0.TOKENS_ID;
    public static final Index TOKENS_PRIMARY = Indexes0.TOKENS_PRIMARY;
    public static final Index TOKEN_TYPES_ID = Indexes0.TOKEN_TYPES_ID;
    public static final Index TOKEN_TYPES_PRIMARY = Indexes0.TOKEN_TYPES_PRIMARY;
    public static final Index USERS_EMAIL = Indexes0.USERS_EMAIL;
    public static final Index USERS_PRIMARY = Indexes0.USERS_PRIMARY;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Indexes0 {
        public static Index JSON_WEB_KEY_KEYID = Internal.createIndex("keyId", JsonWebKey.JSON_WEB_KEY, new OrderField[] { JsonWebKey.JSON_WEB_KEY.KEYID }, true);
        public static Index JSON_WEB_KEY_PRIMARY = Internal.createIndex("PRIMARY", JsonWebKey.JSON_WEB_KEY, new OrderField[] { JsonWebKey.JSON_WEB_KEY.ID }, true);
        public static Index TOKENS_FK_ISSUED_BY_USER = Internal.createIndex("fk_issued_by_user", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.ISSUED_BY_USER }, false);
        public static Index TOKENS_FK_ISSUED_TO = Internal.createIndex("fk_issued_to", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.USER_ID }, false);
        public static Index TOKENS_FK_TOKEN_TYPE_ID = Internal.createIndex("fk_token_type_id", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.TOKEN_TYPE_ID }, false);
        public static Index TOKENS_FK_UPDATED_BY_USER = Internal.createIndex("fk_updated_by_user", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.UPDATED_BY_USER }, false);
        public static Index TOKENS_ID = Internal.createIndex("id", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.ID }, true);
        public static Index TOKENS_PRIMARY = Internal.createIndex("PRIMARY", Tokens.TOKENS, new OrderField[] { Tokens.TOKENS.ID }, true);
        public static Index TOKEN_TYPES_ID = Internal.createIndex("id", TokenTypes.TOKEN_TYPES, new OrderField[] { TokenTypes.TOKEN_TYPES.ID }, true);
        public static Index TOKEN_TYPES_PRIMARY = Internal.createIndex("PRIMARY", TokenTypes.TOKEN_TYPES, new OrderField[] { TokenTypes.TOKEN_TYPES.ID }, true);
        public static Index USERS_EMAIL = Internal.createIndex("email", Users.USERS, new OrderField[] { Users.USERS.EMAIL }, true);
        public static Index USERS_PRIMARY = Internal.createIndex("PRIMARY", Users.USERS, new OrderField[] { Users.USERS.ID }, true);
    }
}
