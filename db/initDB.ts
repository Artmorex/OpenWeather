export default `
create table TEST_OW_SB
(
    id    text not null
        constraint TEST_OW_SB_pk
            primary key,
    value text
);

alter table TEST_OW_SB
    owner to OW_user;

create unique index TEST_OW_SB_id_uindex
    on TEST_OW_SB_ids (id);
`;
