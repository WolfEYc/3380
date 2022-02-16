/* need order by   */
DROP table if exists A;
DROP table if exists B;

Create table A (i int);
Create table B (i int);

Insert into A values (18);
Insert into A values (63);
Insert into A values (7);
Insert into A values (10);
Insert into A values (32);
Insert into A values (51);

Insert into B values (51);
Insert into B values (25);
Insert into B values (33);
Insert into B values (18);