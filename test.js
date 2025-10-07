description
Allow addition of a new query or modification of an existing query

project = GFXIPARCH and Target Environment = GFX13 and variants in (Canis, AT2)

Pull the list based on the query in GFXIPARCH (to be extended to other spaces later)

The following fields need to be pulled:

Feature Name

Feature JIRA

Priority

Variant

Functional Area

Impacted Subsystem

Subsystem Complexity

Complexity (if in GFXIPARCH Subsystem Complexity has any H then Complexity is High, else if GFXIPARCH Subsystem Complexity has any M then Complexity is Medium, if then GFXIPARCH Subsystem Complexity has any L then Complexity is Low else NA)

Affected Blocks

Jama Item

Reference Link

Feature Architect

Status

POR Status - IN = GFXIPARCH Status is architecture complete, OUT =  GFXIPARCH Status is Rejected or Deferred , TRENDING IN = GFXIPARCH Status is Proposal or Specification, SCOPING=  GFXIPARCH Status is specification review )

Impacted IP

Has FW (if Impacted IP contains (FW-CP or FW-DCN or FW-DF or FW-IMU or FW-PMFW or FW - PSP or FW-RLC or FW-SDMA or FW- UMC or FW - VBL or FW- VCN or FW-WGS) display YES else display NO)

Has SW ( if Impacted IP contains (Host KMD or Profile and Debug Tools or Shader Compiler or UMD or guest KMD) then display Yes else display No)

SOC Impact (Needs to be calculated -   if Impacted IP contains SOC DV then display Yes else No)  - is SDMA on this and DF

GC Impact (if Impacted IP contains GC - Config/Harvesting, GC- CG/PG, GC-DV, GC-PV, )

(TBD-> COM – DFT, COM – YIELD → SOC? ?)

Display

All views are available as separate tabs

State management needs to be done while moving across different tabs including filters set, optional fields selected etc.,)

Each View below shall allow filtering capability (AND, OR, NOT, EQUAL for multiple levels)

Each View below with filtered/unfiltered data on all displayed fields should allow download function into a CSV

Each view will need to display the total count on each field

Ability to add any other fields as columns to the view

Allow user to select the view they need

Overall view - Table to start with

Mandatory displayed Fields - Jira numbers, Summary, Priority, Variants, Feature Category, POR Status, Impacted Subsystems, Complexity

Optional Display fields - Jama Item, Feature Architect, Has FW, Has SW, SOC impact, total

Variant view (should allow filtering of the variants - =, AND, OR, NOT) -

Mandatory displayed Fields - Jira numbers, Summary, Priority, Feature Category, POR Status, Impacted Subsystems, Complexity, Has FW, Has SW, SOC impact, Total

Optional Fields - PRS ID, Feature Architect,

Subsystem View - Should allow variant filtering as above to start, and additional subsystem filtering

Fields - Jira numbers, Summary, Priority, Feature Category, POR Status (to be calculated), Impacted subsystem (each has a separate column) with Affected blocks displayed, Has FW, Has SW, GC impact  (count GC Impact), total (count affected blocks)

SW View (Should allow variant filtering as above to start, followed by filtering on SW components)

Fields - Jira numbers, Summary, Priority, Feature Category, POR Status (to be calculated), PRS ID, SW components (calculated from Impacted IP short list) in separate columns, total (to be calculated)

FW View (Should allow variant filtering as above to start, followed by filtering on FW components)

Fields - Jira numbers, Summary, Priority, Feature Category, POR Status (to be calculated), Impacted Subsystems, PRS ID, FW components (calculated from Impacted IP short list) in separate columns, total (to be calculated)

GC View (Should allow variant filtering as above to start, followed by filtering on GC components)

Fields - Jira numbers, Summary, Priority, Feature Category, POR Status (to be calculated), Impacted Subsystems, PRS ID, GC components (calculated from Impacted IP short list) in separate columns, total (to be calculated)
