 Blocklist Management Application
    ✔ should load the page for simple test (1337ms)
    ✔ should find elements simple test (59ms)
    ✔ should display ips comma separted in blocklist list (84ms)
    ✔ should not submit empty form (132ms)
    1) should add 2 blocklists
    2) should delete "First Blocklist"
    3) should add "My Blocklist 3" and delete "My Blocklist 2"
    4) should delete all blocklists
    5) should add 4 quotes with duplicated names
    6) should delete second "My Blocklist"
    7) should delete last blocklist


  4 passing (4s)
  7 failing

  1) Blocklist Management Application
       should add 2 blocklists:

      AssertionError: expected [ Array(1) ] to deeply equal [ Array(3) ]
      + expected - actual

         {
           "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
           "name": "First Blocklist"
         }
      +  {
      +    "ips": "1.2.3.4, 5.6.7.8"
      +    "name": "My Blocklist 1"
      +  }
      +  {
      +    "ips": "2.3.4.5, 6.7.8.9"
      +    "name": "My Blocklist 2"
      +  }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:54:5)

  2) Blocklist Management Application
       should delete "First Blocklist":

      AssertionError: expected [ Array(1) ] to deeply equal [ Array(2) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
      -    "name": "First Blocklist"
      +    "ips": "1.2.3.4, 5.6.7.8"
      +    "name": "My Blocklist 1"
         }
      +  {
      +    "ips": "2.3.4.5, 6.7.8.9"
      +    "name": "My Blocklist 2"
      +  }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:65:5)

  3) Blocklist Management Application
       should add "My Blocklist 3" and delete "My Blocklist 2":
     TypeError: Cannot read properties of undefined (reading 'click')
      at Context.<anonymous> (specs/simple.test.js:79:36)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

  4) Blocklist Management Application
       should delete all blocklists:
     TypeError: Cannot read properties of undefined (reading 'click')
      at Context.<anonymous> (specs/simple.test.js:91:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

  5) Blocklist Management Application
       should add 4 quotes with duplicated names:

      AssertionError: expected [ Array(1) ] to deeply equal [ Array(4) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
      -    "name": "First Blocklist"
      +    "ips": "4.5.6.7, 8.9.0.1, 1.1.1.1"
      +    "name": "My Blocklist"
         }
      +  {
      +    "ips": "4.5.6.7, 8.9.0.1, 2.1.1.1"
      +    "name": "My Blocklist"
      +  }
      +  {
      +    "ips": "4.5.6.7, 8.9.0.1, 3.1.1.1"
      +    "name": "My Blocklist"
      +  }
      +  {
      +    "ips": "4.5.6.7, 8.9.0.1, 4.1.1.1"
      +    "name": "My Blocklist"
      +  }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:117:5)

  6) Blocklist Management Application
       should delete second "My Blocklist":
     TypeError: Cannot read properties of undefined (reading 'click')
      at Context.<anonymous> (specs/simple.test.js:130:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

  7) Blocklist Management Application
       should delete last blocklist:
     TypeError: Cannot read properties of undefined (reading 'click')
      at Context.<anonymous> (specs/simple.test.js:144:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
