# make scheduled migration

Simple script that generates migrations based on a csv file

### example csv:

```csv
"Antwerpen","0 6 1/5 * *","https://ebesluit.antwerpen.be/zittingen/lijst"
"Gent","30 6 5/5 * *","https://ebesluitvorming.gent.be/zittingen/lijst"
"Boechout","33 17 2/5 * *","http://Boechout.meetingburger.net/?AlleVergaderingen=True"
"Kapellen","18 9 3/5 * *","https://kapellen.meetingburger.net/?AlleVergaderingen=True/"
```

### env var:

```
SCHEDULE_CSV_FILE_PATH: path to csv file (mapped)
MIGRATION_PATH: path to migration folder (mapped)
```
