export default `
-- public.WeatherReports definition

-- Drop table

-- DROP TABLE WeatherReports;

CREATE TABLE WeatherReports (
	report_id uuid NOT NULL,
	lat float8 NOT NULL,
	long float8 NOT NULL,
	timezone varchar NULL,
	timezone_offset varchar NULL,
	"current" jsonb NULL,
	hourly jsonb NULL,
	daily jsonb NULL
);

alter table TEST_OW_SB
    owner to OW_user;

create unique index TEST_OW_SB_id_uindex
    on TEST_OW_SB_ids (id);
`;
