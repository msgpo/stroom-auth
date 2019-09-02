/*
 * This file is generated by jOOQ.
 */
package stroom.db.auth;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;

import stroom.db.DefaultCatalog;
import stroom.db.auth.tables.JsonWebKey;
import stroom.db.auth.tables.TokenTypes;
import stroom.db.auth.tables.Tokens;
import stroom.db.auth.tables.Users;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.7"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Auth extends SchemaImpl {

    private static final long serialVersionUID = -2079851059;

    /**
     * The reference instance of <code>auth</code>
     */
    public static final Auth AUTH = new Auth();

    /**
     * The table <code>auth.json_web_key</code>.
     */
    public final JsonWebKey JSON_WEB_KEY = stroom.db.auth.tables.JsonWebKey.JSON_WEB_KEY;

    /**
     * The table <code>auth.tokens</code>.
     */
    public final Tokens TOKENS = stroom.db.auth.tables.Tokens.TOKENS;

    /**
     * The table <code>auth.token_types</code>.
     */
    public final TokenTypes TOKEN_TYPES = stroom.db.auth.tables.TokenTypes.TOKEN_TYPES;

    /**
     * The table <code>auth.users</code>.
     */
    public final Users USERS = stroom.db.auth.tables.Users.USERS;

    /**
     * No further instances allowed
     */
    private Auth() {
        super("auth", null);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        List result = new ArrayList();
        result.addAll(getTables0());
        return result;
    }

    private final List<Table<?>> getTables0() {
        return Arrays.<Table<?>>asList(
            JsonWebKey.JSON_WEB_KEY,
            Tokens.TOKENS,
            TokenTypes.TOKEN_TYPES,
            Users.USERS);
    }
}