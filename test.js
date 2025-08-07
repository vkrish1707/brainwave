
  1) Blocklist Management Application
       should display ips comma separted in blocklist list:

      AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      +    "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
           "name": "First Blocklist"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:33:5)

  2) Blocklist Management Application
       should not submit empty form:

      AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      +    "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
           "name": "First Blocklist"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:41:5)

  3) Blocklist Management Application
       should add 2 blocklists:

      AssertionError: expected [ Array(3) ] to deeply equal [ Array(3) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      +    "ips": "1.1.1.1, 2.2.2.2, 3.3.3.3"
           "name": "First Blocklist"
         }
         {
      -    "ips": "1.2.3.45.6.7.8"
      +    "ips": "1.2.3.4, 5.6.7.8"
           "name": "My Blocklist 1"
         }
         {
      -    "ips": "2.3.4.56.7.8.9"
      +    "ips": "2.3.4.5, 6.7.8.9"
           "name": "My Blocklist 2"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:54:5)

  4) Blocklist Management Application
       should delete "First Blocklist":

      AssertionError: expected [ Array(3) ] to deeply equal [ Array(2) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      +    "ips": "1.2.3.4, 5.6.7.8"
           "name": "My Blocklist 1"
         }
         {
      -    "ips": "2.3.4.56.7.8.9"
      +    "ips": "2.3.4.5, 6.7.8.9"
           "name": "My Blocklist 2"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:65:5)

  5) Blocklist Management Application
       should add "My Blocklist 3" and delete "My Blocklist 2":

      AssertionError: expected [ Array(4) ] to deeply equal [ Array(2) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      +    "ips": "1.2.3.4, 5.6.7.8"
           "name": "My Blocklist 1"
         }
         {
      -    "ips": "2.3.4.56.7.8.9"
      -    "name": "My Blocklist 2"
      -  }
      -  {
      -    "ips": "3.4.5.67.8.9.0"
      +    "ips": "3.4.5.6, 7.8.9.0"
           "name": "My Blocklist 3"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:81:5)

  6) Blocklist Management Application
       should delete all blocklists:

      AssertionError: expected [ Array(4) ] to deeply equal []
      + expected - actual

      -[
      -  {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      -    "name": "My Blocklist 1"
      -  }
      -  {
      -    "ips": "2.3.4.56.7.8.9"
      -    "name": "My Blocklist 2"
      -  }
      -  {
      -    "ips": "3.4.5.67.8.9.0"
      -    "name": "My Blocklist 3"
      -  }
      -]
      +[]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:93:5)

  7) Blocklist Management Application
       should add 4 quotes with duplicated names:

      AssertionError: expected [ Array(8) ] to deeply equal [ Array(4) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      -    "name": "My Blocklist 1"
      -  }
      -  {
      -    "ips": "2.3.4.56.7.8.9"
      -    "name": "My Blocklist 2"
      -  }
      -  {
      -    "ips": "3.4.5.67.8.9.0"
      -    "name": "My Blocklist 3"
      -  }
      -  {
      -    "ips": "4.5.6.78.9.0.11.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 1.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.12.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 2.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.13.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 3.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.14.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 4.1.1.1"
           "name": "My Blocklist"
         }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:117:5)

  8) Blocklist Management Application
       should delete second "My Blocklist":

      AssertionError: expected [ Array(8) ] to deeply equal [ Array(3) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      -    "name": "My Blocklist 1"
      -  }
      -  {
      -    "ips": "2.3.4.56.7.8.9"
      -    "name": "My Blocklist 2"
      -  }
      -  {
      -    "ips": "3.4.5.67.8.9.0"
      -    "name": "My Blocklist 3"
      -  }
      -  {
      -    "ips": "4.5.6.78.9.0.11.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 1.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.12.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 3.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.13.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 4.1.1.1"
           "name": "My Blocklist"
         }
      -  {
      -    "ips": "4.5.6.78.9.0.14.1.1.1"
      -    "name": "My Blocklist"
      -  }
       ]
      
      at expectBlocklistsToBe (specs/simple.test.js:173:37)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async Context.<anonymous> (specs/simple.test.js:132:5)

  9) Blocklist Management Application
       should delete last blocklist:

      AssertionError: expected [ Array(8) ] to deeply equal [ Array(2) ]
      + expected - actual

       [
         {
      -    "ips": "1.1.1.12.2.2.23.3.3.3"
      -    "name": "First Blocklist"
      -  }
      -  {
      -    "ips": "1.2.3.45.6.7.8"
      -    "name": "My Blocklist 1"
      -  }
      -  {
      -    "ips": "2.3.4.56.7.8.9"
      -    "name": "My Blocklist 2"
      -  }
      -  {
      -    "ips": "3.4.5.67.8.9.0"
      -    "name": "My Blocklist 3"
      -  }
      -  {
      -    "ips": "4.5.6.78.9.0.11.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 1.1.1.1"
           "name": "My Blocklist"
         }
         {
      -    "ips": "4.5.6.78.9.0.12.1.1.1"
      +    "ips": "4.5.6.7, 8.9.0.1, 3.1.1.1"
           "name": "My Blocklist"
         }
      -  {
      -    "ips": "4.5.6.78.9.0.13.1.1.1"
      -    "name": "My Blocklist"
      -  }
      -  {
      -    "ips": "4.5.6.78.9.0.14.1.1.1"
      -    "name": "My Blocklist"
      -  }
       ]
