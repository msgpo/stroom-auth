/*
 * This file is generated by jOOQ.
 */
package stroom.db.auth.tables.records;


import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;

import stroom.db.auth.tables.TokenTypes;


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
public class TokenTypesRecord extends UpdatableRecordImpl<TokenTypesRecord> implements Record2<Integer, String> {

    private static final long serialVersionUID = -194124216;

    /**
     * Setter for <code>auth.token_types.id</code>.
     */
    public void setId(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>auth.token_types.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>auth.token_types.token_type</code>.
     */
    public void setTokenType(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>auth.token_types.token_type</code>.
     */
    public String getTokenType() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row2<Integer, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field1() {
        return TokenTypes.TOKEN_TYPES.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return TokenTypes.TOKEN_TYPES.TOKEN_TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component2() {
        return getTokenType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getTokenType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TokenTypesRecord value1(Integer value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TokenTypesRecord value2(String value) {
        setTokenType(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TokenTypesRecord values(Integer value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached TokenTypesRecord
     */
    public TokenTypesRecord() {
        super(TokenTypes.TOKEN_TYPES);
    }

    /**
     * Create a detached, initialised TokenTypesRecord
     */
    public TokenTypesRecord(Integer id, String tokenType) {
        super(TokenTypes.TOKEN_TYPES);

        set(0, id);
        set(1, tokenType);
    }
}
