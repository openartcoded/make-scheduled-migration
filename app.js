const { v4: uuid } = require('uuid');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');



const SCHEDULE_CSV_FILE_PATH = process.env.SCHEDULE_FILE_PATH || "/share/schedule.csv";
const MIGRATION_PATH = process.env.MIGRATION_PATH || "/share/migrations";

mkdirSync(MIGRATION_PATH, { recursive: true });

const schedules = readFileSync(SCHEDULE_CSV_FILE_PATH, { encoding: 'utf-8' });
for (const line of schedules.split('\n')) {

  if (!line.trim()?.length) {
    continue;
  }
  const scheduledJobUuid = uuid();
  const cronScheduleUuid = uuid();
  const scheduledTaskUuid = uuid();
  const dataContainerUuid = uuid();
  const harvestingContainerUuid = uuid();
  const remoteFileUuid = uuid();
  const [title, cronExpression, url] = line.split(',').map(t => t.trim().replaceAll('"', ""));
  const pattern = `
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vocab.deri.ie/cogs#ScheduledJob> .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${scheduledJobUuid}" .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://purl.org/dc/terms/created> "2024-12-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://purl.org/dc/terms/modified> "2024-12-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://purl.org/dc/terms/title> "${title}" .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://redpencil.data.gift/vocabularies/tasks/operation> <http://lblod.data.gift/id/jobs/concept/JobOperation/lblodHarvestAndPublish> .
<http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> <http://redpencil.data.gift/vocabularies/tasks/schedule> <http://redpencil.data.gift/id/cron-schedule/${cronScheduleUuid}> .
<http://redpencil.data.gift/id/cron-schedule/${cronScheduleUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://redpencil.data.gift/vocabularies/tasks/CronSchedule> .
<http://redpencil.data.gift/id/cron-schedule/${cronScheduleUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${cronScheduleUuid}" .
<http://redpencil.data.gift/id/cron-schedule/${cronScheduleUuid}> <http://schema.org/repeatFrequency> "${cronExpression}" .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://redpencil.data.gift/vocabularies/tasks/ScheduledTask> .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${scheduledTaskUuid}" .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://purl.org/dc/terms/created> "2024-01-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://purl.org/dc/terms/modified> "2024-01-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://redpencil.data.gift/vocabularies/tasks/operation> <http://lblod.data.gift/id/jobs/concept/TaskOperation/singleton-job> .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://redpencil.data.gift/vocabularies/tasks/index> "0"^^<http://www.w3.org/2001/XMLSchema#integer> .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://purl.org/dc/terms/isPartOf> <http://redpencil.data.gift/id/scheduled-job/${scheduledJobUuid}> .
<http://redpencil.data.gift/id/scheduled-task/${scheduledTaskUuid}> <http://redpencil.data.gift/vocabularies/tasks/inputContainer> <http://redpencil.data.gift/id/data-container/${dataContainerUuid}> .
<http://redpencil.data.gift/id/data-container/${dataContainerUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#DataContainer> .
<http://redpencil.data.gift/id/data-container/${dataContainerUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${dataContainerUuid}" .
<http://redpencil.data.gift/id/data-container/${dataContainerUuid}> <http://redpencil.data.gift/vocabularies/tasks/hasHarvestingCollection> <http://redpencil.data.gift/id/harvesting-container/${harvestingContainerUuid}> .
<http://redpencil.data.gift/id/harvesting-container/${harvestingContainerUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://lblod.data.gift/vocabularies/harvesting/HarvestingCollection> .
<http://redpencil.data.gift/id/harvesting-container/${harvestingContainerUuid}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/harvesting-container/${harvestingContainerUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${harvestingContainerUuid}" .
<http://redpencil.data.gift/id/harvesting-container/${harvestingContainerUuid}> <http://purl.org/dc/terms/hasPart> <http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://mu.semte.ch/vocabularies/core/uuid> "${remoteFileUuid}" .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://purl.org/dc/terms/created> "2024-01-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://purl.org/dc/terms/modified> "2024-01-09T15:06:01.118Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://redpencil.data.gift/vocabularies/http/requestHeader> <http://data.lblod.info/request-headers/accept/text/html> .
<http://redpencil.data.gift/id/remote-file/${remoteFileUuid}> <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#url> <${url}> .
`;

  const filePath = `${MIGRATION_PATH}/${title.toLowerCase()}-${new Date().toISOString().substring(0, 19)
    .replaceAll(':', '').replaceAll('-', '').replaceAll('.', '').replaceAll('T', '')}`;
  writeFileSync(`${filePath}.graph`, "http://mu.semte.ch/graphs/harvesting");
  writeFileSync(`${filePath}.ttl`, pattern);
}

