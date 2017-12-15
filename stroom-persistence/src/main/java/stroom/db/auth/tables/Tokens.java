/*
 * This file is generated by jOOQ.
*/
package stroom.db.auth.tables;


import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;

import stroom.db.auth.Auth;
import stroom.db.auth.Keys;
import stroom.db.auth.tables.records.TokensRecord;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.9.3"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Tokens extends TableImpl<TokensRecord> {

    private static final long serialVersionUID = 1557486147;

    /**
     * The reference instance of <code>auth.tokens</code>
     */
    public static final Tokens TOKENS = new Tokens();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<TokensRecord> getRecordType() {
        return TokensRecord.class;
    }

    /**
     * The column <code>auth.tokens.id</code>.
     */
    public final TableField<TokensRecord, Integer> ID = createField("id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>auth.tokens.user_id</code>.
     */
    public final TableField<TokensRecord, Integer> USER_ID = createField("user_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>auth.tokens.token_type_id</code>.
     */
    public final TableField<TokensRecord, Integer> TOKEN_TYPE_ID = createField("token_type_id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>auth.tokens.token</code>.
     */
    public final TableField<TokensRecord, String> TOKEN = createField("token", org.jooq.impl.SQLDataType.VARCHAR.length(1000).nullable(false), this, "");

    /**
     * The column <code>auth.tokens.expires_on</code>.
     */
    public final TableField<TokensRecord, Timestamp> EXPIRES_ON = createField("expires_on", org.jooq.impl.SQLDataType.TIMESTAMP, this, "");

    /**
     * The column <code>auth.tokens.issued_on</code>.
     */
    public final TableField<TokensRecord, Timestamp> ISSUED_ON = createField("issued_on", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaultValue(org.jooq.impl.DSL.field("0000-00-00 00:00:00", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * The column <code>auth.tokens.issued_by_user</code>.
     */
    public final TableField<TokensRecord, Integer> ISSUED_BY_USER = createField("issued_by_user", org.jooq.impl.SQLDataType.INTEGER, this, "");

    /**
     * The column <code>auth.tokens.enabled</code>.
     */
    public final TableField<TokensRecord, Boolean> ENABLED = createField("enabled", org.jooq.impl.SQLDataType.BIT.defaultValue(org.jooq.impl.DSL.field("b'1'", org.jooq.impl.SQLDataType.BIT)), this, "");

    /**
     * The column <code>auth.tokens.updated_on</code>.
     */
    public final TableField<TokensRecord, Timestamp> UPDATED_ON = createField("updated_on", org.jooq.impl.SQLDataType.TIMESTAMP, this, "");

    /**
     * The column <code>auth.tokens.updated_by_user</code>.
     */
    public final TableField<TokensRecord, Integer> UPDATED_BY_USER = createField("updated_by_user", org.jooq.impl.SQLDataType.INTEGER, this, "");

    /**
     * The column <code>auth.tokens.comments</code>.
     */
    public final TableField<TokensRecord, String> COMMENTS = createField("comments", org.jooq.impl.SQLDataType.VARCHAR.length(500), this, "");

    /**
     * Create a <code>auth.tokens</code> table reference
     */
    public Tokens() {
        this("tokens", null);
    }

    /**
     * Create an aliased <code>auth.tokens</code> table reference
     */
    public Tokens(String alias) {
        this(alias, TOKENS);
    }

    private Tokens(String alias, Table<TokensRecord> aliased) {
        this(alias, aliased, null);
    }

    private Tokens(String alias, Table<TokensRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, "");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return Auth.AUTH;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<TokensRecord, Integer> getIdentity() {
        return Keys.IDENTITY_TOKENS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<TokensRecord> getPrimaryKey() {
        return Keys.KEY_TOKENS_PRIMARY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<TokensRecord>> getKeys() {
        return Arrays.<UniqueKey<TokensRecord>>asList(Keys.KEY_TOKENS_PRIMARY, Keys.KEY_TOKENS_ID);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<TokensRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<TokensRecord, ?>>asList(Keys.FK_ISSUED_TO, Keys.FK_TOKEN_TYPE_ID, Keys.FK_ISSUED_BY_USER, Keys.FK_UPDATED_BY_USER);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Tokens as(String alias) {
        return new Tokens(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Tokens rename(String name) {
        return new Tokens(name, null);
    }
}
