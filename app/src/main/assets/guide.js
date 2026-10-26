/* Six-track career guide for Ascend.
   Source: "Six-Track Engineering Career Guide" (26 Oct 2026): Foundations → Software → Database →
   Cloud → Security → ML → AI, plus portfolio projects and certifications.

   This file only holds curriculum data and pure helpers. index.html calls GUIDE.install(...) once,
   which merges these tracks into POOLS/TRACKS and keeps the original tracks as a library.

   Every lesson gets a hands-on task (taskFor), so a study block always ends with something built,
   run or written down, not just read. */
(function () {
  "use strict";

  /* ---------- the six tracks, stage by stage ------------------------------------------------- */
  // [stage title, learn topics, checkpoint, hands-on task template ({t} = topic)]
  const TRACKS = [
    { k: "fnd", n: "Foundations", s: "FND", c: "#A3E635", from: 1, to: 4,
      how: "Learn just enough to use it, then use it in your own code or terminal the same day. Keep every script in your F-1 / F-2 repos.",
      done: "You used it in something you pushed to GitHub and can explain it without notes.",
      stages: [
        ["Python", "Syntax, data types, functions, modules, classes/OOP, exceptions, files, virtual environments, packaging (pip, uv), type hints, comprehensions", "A 300-line Python CLI tool with tests and a README", "In your F-1 expense-tracker repo, use {t} in real code, add one pytest test that proves it works, and commit it."],
        ["CS fundamentals", "Big-O, arrays, hash maps, linked lists, stacks, queues, trees, heaps, graphs, sorting, binary search, recursion, basic dynamic programming, CPU and memory, processes and threads", "75 easy/medium problems solved, each with its time and space cost explained", "Implement {t} from scratch in Python, test 5 edge cases, write its Big-O in the docstring, then solve one NeetCode problem that needs it."],
        ["Linux and the shell", "File system, permissions, users, processes, pipes, bash scripting, ssh and keys, package managers, cron, systemd, environment variables", "A small web server on a Linux VM with a scripted, automated backup", "On a Linux VM or WSL, practise {t}. Save the commands that worked as a script or cheat-sheet entry in your F-2 dotfiles repo."],
        ["Git and GitHub", "Commits, branches, merge vs rebase, pull requests, conflicts, tags, .gitignore, GitHub Actions basics", "A pull request merged into someone else's open-source project (a docs fix counts)", "In a throwaway repo, practise {t}: make the mess on purpose, then fix it. Write the exact commands in your notes."],
        ["Networking", "TCP/IP and OSI, IP addressing, subnets/CIDR, DNS, HTTP/HTTPS, TLS, ports, NAT, firewalls, load balancers, proxies", "You can explain what happens when you type a URL and debug with curl, dig, ping and traceroute", "Show {t} with real commands (curl, dig, ping, traceroute, ss). Paste the output and your explanation into your F-3 'type a URL' write-up."],
        ["Math for ML", "Vectors and matrices, dot product, derivatives, gradients, chain rule, probability distributions, Bayes, mean and variance, hypothesis tests", "Linear regression with gradient descent in NumPy, loss plotted falling", "Work three examples of {t} by hand, check them in NumPy, and plot one result with Matplotlib."]
      ] },
    { k: "sw", n: "Software Development", s: "SWE", c: "#38BDF8", from: 3, to: 8,
      how: "Read the docs for 15 minutes, then build: every topic ends as a commit in SD-1…SD-4. Use an AI assistant, but read and test what it writes.",
      done: "It works in one of your portfolio repos, with a test or a screenshot proving it.",
      stages: [
        ["1 · TypeScript and typed code (~4 wk)", "Types, interfaces, generics, async/await, promises, modules, npm, the event loop", "F-1 rewritten in TypeScript with typed functions", "Write a strict-mode TypeScript module that uses {t}, run tsc with zero errors, and add one Vitest test."],
        ["2 · Web and front end (~5 wk)", "Semantic HTML, CSS flexbox, CSS grid, responsive design, the DOM, React components, state, hooks, routing, forms, accessibility", "SD-1 portfolio site live", "Add something to your SD-1 portfolio that uses {t}. Check it at phone width and using only the keyboard."],
        ["3 · Back end and APIs (~5 wk)", "HTTP methods and status codes, REST design, validation, sessions and JWT, OAuth 2.0, authorisation, error handling, pagination, background jobs, OpenAPI", "SD-2 API with login, roles and generated docs", "Add an SD-2 endpoint that exercises {t}, document it in OpenAPI, and call it from Bruno or Postman."],
        ["4 · Testing and code quality (~3 wk)", "The test pyramid, unit tests, integration tests, end-to-end tests, mocking, fixtures, coverage, linting, formatting, reviewing PRs", "SD-2 at 80% coverage; CI blocks failing PRs", "Write tests for SD-2 that use {t}. Break CI once on purpose, then fix it."],
        ["5 · Design and architecture (~4 wk)", "SOLID, repository pattern, strategy pattern, factory pattern, observer pattern, clean architecture, monolith vs microservices, caching, queues, scaling and load balancing, rate limiting, CAP theorem", "SD-3 with a written design doc", "Draw {t} as a Mermaid diagram for SD-3 and write three sentences on the trade-off it makes."],
        ["6 · Ship and operate (~3 wk)", "Docker, CI/CD, config and secrets, structured logging, health checks, monitoring, feature flags, semantic versioning", "SD-4 deploys with one command on every merge", "Apply {t} to SD-4 (Dockerfile, workflow or config), push, and confirm the GitHub Actions run is green."]
      ] },
    { k: "dbe", n: "Database Engineering", s: "DB", c: "#F472B6", from: 6, to: 10,
      how: "Always on real PostgreSQL with real volume. Write the query or change yourself, then prove it with EXPLAIN or a test.",
      done: "You can show the query, the plan or the restore that proves it on your own data.",
      stages: [
        ["1 · SQL mastery (~4 wk)", "SELECT and filtering, all JOIN types, GROUP BY and HAVING, subqueries, CTEs, recursive CTEs, window functions, views, NULL handling", "50 SQL problems, 10 with window functions", "Write three PostgreSQL queries that use {t} on the DB-1 data (or pgexercises.com) and keep them in queries.sql with the expected results."],
        ["2 · Data modelling (~3 wk)", "ER diagrams, keys and constraints, 1NF to BCNF, denormalisation, star and snowflake schemas, slowly changing dimensions", "DB-1 schema passes a 3NF review", "Apply {t} to the DB-1 e-commerce schema: update the ER diagram and write the migration."],
        ["3 · Performance and internals (~4 wk)", "Pages and heaps, B-tree indexes, GIN and GiST indexes, BRIN indexes, EXPLAIN ANALYZE, the query planner, MVCC, VACUUM, connection pooling, partitioning", "DB-2: one query 10× faster, with plans before and after", "Measure {t} with EXPLAIN ANALYZE on a 1M-row table and save the plan before and after a change in DB-2."],
        ["4 · Transactions and concurrency (~2 wk)", "ACID, isolation levels, dirty reads, lost updates, phantoms, locks, deadlocks, optimistic vs pessimistic locking", "DB-3 reproduces and fixes a lost update with a concurrent test", "Write a concurrent test in DB-3 that makes {t} happen, then show the fix."],
        ["5 · NoSQL and specialised stores (~3 wk)", "MongoDB, Redis, Cassandra, Neo4j, OpenSearch, pgvector, modelling per store, CAP trade-offs", "DB-4 with a written justification for each store", "Run {t} in Docker, model one small DB-4 dataset in it, and write a paragraph on why it fits (or doesn't)."],
        ["6 · Operations, reliability, scale (~4 wk)", "Logical vs physical backups, point-in-time recovery, streaming replication, read replicas, failover, sharding, zero-downtime migrations, roles and row-level security, encryption, managed databases", "DB-5 restored to a chosen minute, time recorded", "Practise {t} on your Docker PostgreSQL (DB-5): run it, break it, recover, and time each step."]
      ] },
    { k: "cld", n: "Cloud Engineering", s: "CLOUD", c: "#22D3EE", from: 9, to: 14,
      how: "Budget alarm first. Build it, prove it, destroy it with Terraform. Prefer free tier and local Kubernetes (kind/k3s).",
      done: "You built it from code, saw it work, and tore it down without leftovers on the bill.",
      stages: [
        ["1 · Cloud fundamentals (~4 wk)", "Regions and AZs, shared responsibility, IAM users and roles, IAM policies and least privilege, EC2, S3, EBS, VPC subnets and route tables, security groups and NAT, Route 53, pricing and billing alarms", "CL-1 static site on S3 + CloudFront with HTTPS and a budget alarm", "Do {t} in the AWS free tier with a budget alarm on. Save the CLI output in your notes, then delete what you created."],
        ["2 · Architecture and managed services (~4 wk)", "Load balancers, auto scaling, RDS, DynamoDB, Lambda, API Gateway, SQS and SNS, EventBridge, ElastiCache, the Well-Architected pillars", "CL-2 three-tier app across two AZs", "Add {t} to the CL-2 design: update the architecture diagram and price it with the AWS pricing calculator."],
        ["3 · Containers (~3 wk)", "Docker in depth, multi-stage builds, image layers, small secure images, ECR, ECS on Fargate", "SD-4 on Fargate behind a load balancer", "Containerise something you built with {t} in mind, check the image size, and scan it with Trivy."],
        ["4 · Infrastructure as code (~4 wk)", "Terraform providers and resources, variables and outputs, modules, state and remote backends, workspaces, import and drift, CloudFormation and CDK awareness, GitOps", "CL-2 rebuilt in Terraform: one command up, one down", "Write {t} in Terraform for CL-2: plan, apply, destroy. Commit the code, never the state file."],
        ["5 · Kubernetes (~5 wk)", "Pods, deployments, services, ingress, ConfigMaps and Secrets, volumes, Helm, Horizontal Pod Autoscaler, RBAC, EKS/AKS/GKE", "CL-4 Helm deploy autoscales under load", "Try {t} on a local kind or k3s cluster. Save the YAML or Helm values and one kubectl debugging session."],
        ["6 · CI/CD, observability, reliability (~4 wk)", "GitHub Actions pipelines, Argo CD, blue/green and canary releases, metrics, logs and traces, Prometheus and Grafana, OpenTelemetry, SLOs and error budgets, incident response and postmortems, FinOps", "CL-5 deploys on merge with auto-rollback on a failed health check", "Add {t} to the CL-5 pipeline or dashboard, trigger it once, and note what you saw."]
      ] },
    { k: "sec", n: "Security Engineering", s: "SEC", c: "#F87171", from: 12, to: 18,
      how: "Only attack systems you own or labs that allow it. Every attack you learn ends with the fix and the detection.",
      done: "You exploited it in a lab, fixed it in code, and can explain the defence.",
      stages: [
        ["1 · Fundamentals and threat modelling (~4 wk)", "The CIA triad, authentication vs authorisation, hashing and salting, symmetric and asymmetric crypto, TLS, PKI, common attack types, risk, STRIDE, data-flow diagrams", "A threat model for SD-2", "Use {t} in your SD-2 threat model: add one threat, its STRIDE category and a mitigation."],
        ["2 · Network and system security (~4 wk)", "Firewalls, VPNs, IDS and IPS, packet analysis with Wireshark, port scanning with nmap, Linux hardening, Windows and Active Directory, privilege escalation concepts", "20 beginner lab rooms with write-ups", "Finish one TryHackMe or Hack The Box room that covers {t} and write a 10-line write-up (lab machines only)."],
        ["3 · Application security (~5 wk)", "Injection, broken access control, XSS, SSRF, insecure design, the OWASP API Top 10, secure coding, token security, SAST and DAST, dependency scanning, secret scanning", "SE-2: five vulnerabilities found and fixed by PR", "Find {t} in OWASP Juice Shop or PortSwigger Academy, exploit it in the lab, then fix it in your own code with a PR."],
        ["4 · Cloud and container security (~4 wk)", "Least privilege and permission boundaries, KMS, CloudTrail, GuardDuty and Security Hub, CIS benchmarks, image scanning, Kubernetes RBAC, network policies, pod security, policy as code", "SE-3 benchmark scan before and after", "Scan your Terraform or images for {t} with Prowler, Checkov or Trivy, fix one finding, and rescan."],
        ["5 · Detection and incident response (~4 wk)", "SIEM, log sources, MITRE ATT&CK, Sigma rules, triage, the incident response lifecycle, forensics basics", "SE-1 detects three simulated techniques, responses documented", "Simulate {t} in your SE-1 lab and write a Sigma or Wazuh rule that catches it."],
        ["6 · DevSecOps and AI security (~4 wk)", "Shift-left CI/CD, SBOMs, supply chain security (SLSA, signing), secrets management, prompt injection, sensitive data disclosure, excessive agency", "SE-4 fails builds on critical vulnerabilities or leaked secrets", "Add {t} to the SE-4 pipeline so a bad build fails. Show one red run and one green run."]
      ] },
    { k: "mle", n: "ML Engineering", s: "ML", c: "#FBBF24", from: 15, to: 22,
      how: "Intuition first (video or diagram), then the maths, then the smallest version you can run yourself on real data.",
      done: "You ran it end to end and can say when you would and would not use it.",
      stages: [
        ["1 · Math and data (~5 wk)", "Matrix operations, eigenvectors, gradients, distributions, maximum likelihood, NumPy, pandas, data cleaning, exploratory data analysis, visualisation, SQL feature building", "A published EDA of a public dataset with five findings", "Do {t} on a real public dataset in a notebook and write one finding in plain English."],
        ["2 · Classical ML (~6 wk)", "Linear and logistic regression, decision trees, random forests, gradient boosting, k-means, PCA, train/test splits and cross-validation, bias and variance, precision, recall, F1 and ROC-AUC, feature engineering, class imbalance, data leakage", "ML-1 beats a baseline and explains its predictions", "Train a model using {t} on the ML-1 data and compare it with a baseline on the right metric."],
        ["3 · Deep learning (~7 wk)", "Backpropagation, optimisers, regularisation, CNNs, sequence models, attention, transformers, transfer learning, GPUs", "A small character-level transformer from scratch; ML-2 shipped", "Implement the smallest working version of {t} in PyTorch and get the loss to fall on a toy task."],
        ["4 · Data engineering for ML (~4 wk)", "Batch pipelines and scheduling, transformations, data versioning, data quality tests, feature stores, streaming basics", "ML-3 daily feature table, no manual steps", "Add {t} to the ML-3 pipeline so it runs with no manual steps."],
        ["5 · MLOps (~6 wk)", "Experiment tracking, model registry, reproducible training, CI/CD for models, model serving, GPU vs CPU inference", "ML-4: one command retrains, evaluates, registers and deploys", "Wire {t} into ML-4 so one command reproduces the result."],
        ["6 · Production and responsible ML (~4 wk)", "Data and concept drift, A/B and shadow tests, quantisation, ONNX, distributed training basics, fairness, explainability, model cards", "A drift alert triggers retraining; ML-5 shipped", "Measure {t} on a deployed (or simulated) model and record the numbers in its model card."]
      ] },
    { k: "aie", n: "AI Engineering", s: "AI·ENG", c: "#A78BFA", from: 20, to: 26,
      how: "Build it, then measure it. An AI feature without an eval is a demo, not a product.",
      done: "It works and you have numbers (eval score, cost, latency) to prove it.",
      stages: [
        ["1 · LLM fundamentals and APIs (~3 wk)", "Tokens, embeddings, the transformer recap, context windows, temperature and top-p, open vs hosted models, streaming, structured JSON output, tool calling, cost and latency", "A CLI assistant that streams answers and returns validated JSON", "Build a tiny CLI that shows {t} with an LLM API (or Ollama locally) and print the token usage and cost."],
        ["2 · Prompt and context engineering (~3 wk)", "System prompts, few-shot examples, step-by-step reasoning, prompt templates, prompt versioning, long-conversation context, prompt caching, failure handling", "A versioned prompt library with tests for each prompt", "Write two prompt versions that use {t} and a 5-case test that shows which one is better."],
        ["3 · Retrieval-augmented generation (~5 wk)", "Document parsing, chunking, embedding models, vector databases, hybrid search, re-ranking, metadata filters, citations, index freshness", "AI-1 answers over 500+ docs with correct citations", "Add {t} to AI-1's retrieval and measure answer quality on 10 test questions before and after."],
        ["4 · Evaluation and observability (~4 wk)", "Eval datasets, exact-match and rubric scoring, LLM-as-judge and its biases, faithfulness and answer relevance, CI regression tests, tracing, cost and latency dashboards", "AI-1 evals run on every PR and block regressions", "Add {t} to AI-1's eval suite and make CI fail when the score drops."],
        ["5 · Agents and tools (~6 wk)", "Tool use, planning loops, multi-step workflows, the Model Context Protocol (MCP), agent memory, multi-agent patterns, human-in-the-loop approval, sandboxing and permissions, when not to use an agent", "AI-3 completes a five-step task with tools and asks before risky actions", "Give your AI-3 agent a tool or guard for {t}, run a 5-step task, and read the trace."],
        ["6 · Fine-tuning, deployment, safety (~6 wk)", "Prompting vs RAG vs fine-tuning, LoRA and QLoRA, serving open models with vLLM, quantisation, LLM gateways, guardrails, prompt-injection defence, PII handling, responsible AI", "AI-4 fine-tuned small model beats the base model on your evals", "Try {t} on a small open model and compare it with plain prompting on your eval set."]
      ] }
  ];

  /* ---------- portfolio projects ([id, name, month, build, proves, stretch]) ----------------- */
  const PROJECTS = [
    ["F-1", "Expense tracker CLI", 1, "Python, argparse, SQLite and pytest: add, list and summarise spending by month", "Python, testing, SQL basics", "export charts to PNG"],
    ["F-2", "Dotfiles and scripts repo", 2, "your shell config plus 5 genuinely useful bash scripts with a README", "Linux and shell scripting", "a one-command installer for a fresh machine"],
    ["F-3", "\"What happens when you type a URL\" write-up", 3, "a blog post with your own diagrams of DNS, TCP, TLS and HTTP", "networking you can explain", "capture the whole flow in Wireshark and annotate it"],
    ["SD-1", "Portfolio site", 4, "a responsive React/Next.js site listing every project, with a blog", "front end and deployment", "Lighthouse 95+ in all four categories"],
    ["SD-2", "Task manager API", 5, "FastAPI + PostgreSQL with JWT login, roles, tests and OpenAPI docs", "API design, auth, testing", "rate limiting and WebSocket notifications"],
    ["SD-6", "Open-source contributions", 6, "three merged pull requests to an active project", "big codebases and collaboration", "become a regular reviewer"],
    ["SD-3", "URL shortener with analytics", 7, "Redis caching, click analytics and a written design doc", "caching and trade-off writing", "a k6 load test to 1,000 req/s"],
    ["DB-1", "E-commerce database", 7, "a normalised schema, constraints, 1M seeded rows and 20 analytics queries", "modelling and advanced SQL", "a nightly-loaded star-schema copy"],
    ["SD-4", "Full-stack study tracker", 8, "React + API, Docker and CI/CD, deployed", "end-to-end delivery", "make it an offline PWA"],
    ["DB-2", "Query performance lab", 8, "slow-query benchmarks before and after indexes, partitioning and rewrites, with plans", "tuning and internals", "a blog post explaining one plan line by line"],
    ["DB-3", "Bank-transfer simulator", 9, "concurrent transfers at each isolation level, deadlock handling, no-money-lost tests", "transactions and concurrency", "compare against a distributed SQL database"],
    ["CL-1", "Static site infrastructure", 10, "SD-1 on S3 + CloudFront + Route 53 with HTTPS, Terraform and GitHub Actions", "IaC, DNS, CDN, CI/CD", "Terratest"],
    ["DB-4", "Polyglot store app", 10, "catalogue in MongoDB, cart in Redis, orders in PostgreSQL, search in OpenSearch", "choosing the right store", "semantic search with pgvector"],
    ["CL-2", "Highly available web app", 11, "ALB, auto scaling group, RDS Multi-AZ, private subnets and SSM access", "architecture and networking", "survive a terminated AZ"],
    ["DB-5", "Highly available PostgreSQL", 11, "primary + replica in Docker, automated backups, a failover test and Grafana", "operations and recovery", "automated failover with Patroni"],
    ["CL-3", "Serverless image pipeline", 12, "S3 upload → Lambda resize → DynamoDB metadata → browse API", "event-driven serverless", "the monthly cost per 1,000 images"],
    ["SD-5", "Real-time chat", 12, "WebSockets, rooms, presence and history", "concurrency and pub/sub", "end-to-end encryption"],
    ["CL-4", "Kubernetes platform", 13, "k3s or EKS with Helm, ingress, autoscaling, Prometheus and Grafana", "Kubernetes operations", "the cluster built by Terraform"],
    ["CL-5", "GitOps delivery pipeline", 14, "Actions builds and scans images, Argo CD deploys, canary with auto-rollback", "CI/CD and reliability", "an SLO dashboard with an error budget"],
    ["SE-2", "Secure code review", 14, "an audit of Juice Shop or SD-2 with severity scores and fix PRs", "application security", "custom Semgrep rules"],
    ["SE-3", "Cloud security baseline", 15, "a Terraform module enforcing CloudTrail, GuardDuty, encryption and least privilege, with Prowler before/after", "cloud security and IaC", "EventBridge + Lambda auto-remediation"],
    ["SE-1", "Home security lab", 16, "Kali, vulnerable targets and a Wazuh SIEM with attack-and-detect write-ups", "networking, detection, incident response", "map every detection to ATT&CK"],
    ["SE-4", "DevSecOps pipeline", 17, "SAST, dependency, image and secret scans, an SBOM and image signing", "supply-chain security", "a Kubernetes admission policy that blocks unsigned images"],
    ["ML-1", "Tabular prediction end to end", 17, "a loan-default or churn model with EDA, model comparison, SHAP and a report", "classical ML and communication", "calibrated probabilities and a cost-based threshold"],
    ["ML-2", "Image classifier service", 19, "a transfer-learning model served as an API with a web demo", "deep learning and serving", "quantised, under 50 ms per image on CPU"],
    ["ML-3", "Feature and training pipeline", 20, "ingest → validate → features → train → MLflow, with DVC data versioning", "data engineering for ML", "fed by a Kafka stream"],
    ["ML-4", "Production model platform", 21, "a model on Kubernetes with dashboards, drift detection and auto-retraining", "MLOps", "a shadow deployment of two models"],
    ["ML-5", "Recommendation system", 22, "a collaborative-filtering baseline, then a two-tower recommender with offline metrics", "ranking and embeddings", "a simulated A/B test with significance analysis"],
    ["AI-1", "Document Q&A assistant", 22, "RAG over a public doc set with hybrid search, re-ranking, citations and an eval suite", "retrieval and evaluation", "stays accurate after the sources change"],
    ["AI-2", "AI pull-request reviewer", 23, "a GitHub App that reviews diffs and flags bugs and security issues inline", "tool integration", "measured precision on 50 real PRs"],
    ["AI-3", "Research agent with tools", 24, "MCP tools (search, files, DB), approvals, tracing and a cost cap", "agents and safety", "a planner + checker multi-agent version"],
    ["SE-5", "LLM app red-team report", 24, "attack your own AI-1 for prompt injection and leakage, then add and measure guardrails", "AI security", "an automated attack suite in CI"],
    ["AI-4", "Fine-tuned small model", 25, "LoRA fine-tune vs prompting vs RAG, served with vLLM", "fine-tuning and serving", "quantised so it runs on a laptop"],
    ["AI-5", "LLM gateway", 25, "routing, caching, rate limits, per-user cost and guardrails", "AI platform engineering", "automatic fallback when a provider fails"],
    ["AI-6", "Voice or vision assistant", 26, "speech-to-text + LLM + text-to-speech, or image understanding", "multimodal AI", "under 1 s end to end"]
  ];
  const CAPSTONE = [
    ["M1", "Design doc, architecture diagram and threat model", 25],
    ["M2", "Core ticket app with auth, tests and CI", 25],
    ["M3", "Database, cache, queue and knowledge-base index", 26],
    ["M4", "Classifier trained, served and monitored", 27],
    ["M5", "AI reply drafter with evals and approvals", 28],
    ["M6", "Terraform, Kubernetes, GitOps and dashboards", 29],
    ["M7", "Security hardening, load test and red-team pass", 29],
    ["M8", "5-minute demo video, write-up and public launch", 30]
  ];

  /* ---------- certifications ([name, month, free prep, note]) -------------------------------- */
  const CERTS = [
    ["GitHub Foundations (GH-900)", 4, ["Microsoft Learn: GitHub Foundations", "https://learn.microsoft.com/training/paths/github-foundations/"], "Cheap, quick, never expires."],
    ["GitHub Actions (GH-200)", 9, ["Microsoft Learn: GitHub Actions", "https://learn.microsoft.com/training/paths/github-actions/"], "Optional. You already run three apps on Actions, so this one is close."],
    ["AWS Solutions Architect – Associate (SAA-C03)", 12, ["AWS Skill Builder", "https://skillbuilder.aws/"], "The most useful single cert for a first cloud or DevOps job. One pass = 50% off your next AWS exam."],
    ["HashiCorp Terraform Associate (004)", 14, ["Terraform certification tutorials", "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004"], "Or CKA, whichever your target jobs list more."],
    ["CompTIA Security+", 17, ["Professor Messer Security+", "https://www.professormesser.com/sy0-701-certification-course/"], "SY0-701 now; SY0-801 expected around Nov 2026. Same credential either way."],
    ["AWS Machine Learning Engineer – Associate", 22, ["AWS Skill Builder", "https://skillbuilder.aws/"], "MLA-C02 adds GenAI. Do not study for the retired ML Specialty."],
    ["Databricks GenAI Engineer Associate (or Azure AI-103)", 26, ["Databricks: GenAI Engineer Associate", "https://www.databricks.com/learn/certification/genai-engineer-associate"], "RAG, agents and evaluation."],
    ["AWS Generative AI Developer – Professional", 36, ["AWS: GenAI Developer – Professional", "https://aws.amazon.com/certification/certified-generative-ai-developer-professional"], "After 1–2 years in a role. Needs real experience."]
  ];
  const CERT_STEPS = [
    ["read the official exam guide; list every domain and its weight", "Write the domains as a checklist in your notes. Mark each one red, amber or green honestly."],
    ["first pass through the free course", "Cover the two heaviest domains. After each module, write 5 flashcards in your own words."],
    ["hands-on lab for the heaviest domain", "Do one real lab (console, CLI or code) for the heaviest domain and save the commands or screenshots."],
    ["practice exam 1, timed", "Take a full timed practice exam. Log the score and the three weakest domains."],
    ["fix the two weakest domains", "Re-learn the two weakest domains with labs, not just reading. Redo every question you missed."],
    ["practice exam 2 (aim for 80%+), then book", "If you scored 80%+, check the vendor's exam page for the current version and date, then book it. If not, repeat steps 4–5."]
  ];

  /* ---------- hands-on tasks for the original tracks ---------------------------------------- */
  const LEGACY_TASKS = {
    se: [
      "Write a 30-line example of {t} in Python or TypeScript, then three sentences on when you would NOT use it.",
      "Find {t} in a real open-source repo with GitHub code search; link the file in your notes and explain it in your own words.",
      "Draw {t} as a Mermaid diagram in your notes repo and commit it.",
      "Refactor a small piece of one of your projects to use {t}; commit the before and after."
    ],
    dsa: [
      "Solve two NeetCode problems with {t}; write the time and space cost as a comment on each.",
      "Implement {t} from memory, then test it on 5 edge cases (empty, one item, duplicates, sorted, huge).",
      "Re-solve an old problem with {t} in under 25 minutes, timer on, no hints."
    ],
    code: [
      "Type a runnable Java example of {t} (no copy-paste), break it on purpose, read the error, fix it.",
      "Write {t} in Java and again in Python or TypeScript; compare the two in three bullets.",
      "Write a JUnit test that proves {t} behaves the way you think it does."
    ],
    ai: [
      "Implement the smallest version of {t} in a notebook on a toy dataset, then note when you would use it.",
      "Read or watch one explanation of {t}, then reproduce its key result yourself in NumPy or PyTorch."
    ],
    data: [
      "Apply {t} to a real Kaggle dataset; save the notebook or query and one chart.",
      "Do {t} two ways (SQL and pandas) and check both give the same result."
    ],
    project: ["Ship one small, working commit for: {t}. End the session with something that runs, even if it's rough."],
    review: [
      "Close the notes and recall everything about {t} for 10 minutes on paper, then check and make 5 Anki cards for the gaps.",
      "Explain {t} out loud as if teaching a junior colleague (record 2 minutes on your phone), then fix what you stumbled on."
    ],
    career: [
      "Write a STAR story or answer for {t}, say it aloud in under 2 minutes, and record it.",
      "Turn {t} into one concrete improvement on your CV, LinkedIn or portfolio today."
    ]
  };

  /* ---------- building the pools ------------------------------------------------------------ */
  function splitTopics(s) {
    const out = [];
    let depth = 0, cur = "";
    for (const ch of s) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out.filter(Boolean).map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  }

  const POOLS = {}, DESC = {}, REFS = {}, TASKS = {};
  TRACKS.forEach((tr) => {
    const pool = [];
    tr.stages.forEach(([title, learn, check, task]) => {
      const course = tr.n + " · " + title;
      DESC[course] = "Proof for this stage: " + check + ".";
      TASKS[course] = task;
      splitTopics(learn).forEach((t) => pool.push({ t, c: course }));
      pool.push({ t: "Checkpoint: " + check, c: course, task: "This is the stage's proof. Build it until it really works, push it, and link it from your portfolio README. Only then tick it." });
    });
    POOLS[tr.k] = pool;
  });

  const build = [];
  PROJECTS.forEach(([id, name, m, what, proves, stretch]) => {
    const c = id + " · " + name;
    DESC[c] = "Build " + what + ". Proves: " + proves + ".";
    build.push(
      { t: id + " plan: problem, 3 features, empty repo", c, g: m, task: "Create the repo with a licence, a README stating the problem in two sentences and three features, and a CI workflow that runs (even if it only lints)." },
      { t: id + " core: " + what, c, g: m, task: "Build the smallest version that runs end to end. Commit in small steps and push before the session ends." },
      { t: id + " prove it: tests, CI badge, one number", c, g: m, task: "Add tests that run in GitHub Actions, put the badge in the README, and measure one real number (speed, coverage, accuracy or cost)." },
      { t: id + " ship it: demo, diagram, write-up", c, g: m, task: "Add a live demo or a 2-minute video, an architecture diagram with 'why I chose this', and a 'What I would do next' section. Pin it on GitHub and share it on LinkedIn." },
      { t: id + " stretch: " + stretch, c, g: m + 1, task: "Optional but impressive: " + stretch + ". Timebox it to this session and write up what you learned either way." }
    );
  });
  CAPSTONE.forEach(([id, what, m]) => {
    build.push({ t: "Capstone " + id + ": " + what, c: "Capstone · Smart Support Desk", g: m, task: "Smart Support Desk milestone. Every track owns a visible part: show the evidence (diagram, tests, dashboard, eval scores) in the repo before ticking it." });
  });
  DESC["Capstone · Smart Support Desk"] = "A support platform where every track shows: React + FastAPI, PostgreSQL/pgvector/Redis, Kubernetes on AWS with Terraform, a DevSecOps pipeline, an ML router and an AI reply drafter with evals and human approval.";
  POOLS.build = build;

  const cert = [];
  CERTS.forEach(([name, m, ref, note]) => {
    DESC[name] = note + " Target: about guide month " + m + ". Check the vendor page before booking.";
    REFS[name] = ref;
    CERT_STEPS.forEach(([step, task]) => cert.push({ t: name + ": " + step, c: name, g: m - 3, task }));
  });
  POOLS.cert = cert;

  /* ---------- mixing the tracks -------------------------------------------------------------- */
  const GUIDE_ORDER = TRACKS.map((t) => t.k);
  const FROM = Object.fromEntries(TRACKS.map((t) => [t.k, t.from]));
  const GATED = { build: 1, cert: 1 };

  /* Ten-slot learning rotation: six-track tracks take 6 of 10 slots, the original curriculum 4. */
  const LEARN_PATTERN = ["G1", "G1", "dsa", "G2", "L", "G1", "review", "G2", "G1", "L"];
  function legacyPool(month) {
    if (month < 4) return ["se", "code"];
    if (month < 9) return ["se", "code", "data"];
    if (month < 15) return ["se", "data", "career", "code"];
    return ["ai", "data", "career", "se"];
  }

  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

  const GUIDE = {
    TRACKS, CERTS, GUIDE_ORDER, GATED,
    pools: POOLS,

    /* Merges the guide into the app's tables. Guide tracks come first; the original tracks follow as a library. */
    install(t) {
      Object.assign(t.POOLS, POOLS);
      Object.assign(t.COURSEDESC, DESC);
      Object.assign(t.REF, REFS);
      const old = Object.assign({}, t.TRACKS);
      Object.keys(t.TRACKS).forEach((k) => delete t.TRACKS[k]);
      TRACKS.forEach((tr) => { t.TRACKS[tr.k] = { n: tr.n, c: tr.c, s: tr.s, guide: 1 }; t.TRACKGUIDE[tr.k] = { how: tr.how, done: tr.done }; });
      t.TRACKS.build = { n: "Portfolio projects", c: "#FB923C", s: "BUILD", guide: 1 };
      t.TRACKS.cert = { n: "Certifications", c: "#FACC15", s: "CERT", guide: 1 };
      t.TRACKGUIDE.build = { how: "Small commits, ship something that runs every session. Follow the portfolio playbook: demo, diagram, tests in CI, one number.", done: "A stranger could open the repo and see what it does, how it's built and proof it works within a minute." };
      t.TRACKGUIDE.cert = { how: "Learn by doing labs, not only videos. Practice exams show you what to fix; don't book until you score 80%+.", done: "You can pass a timed practice exam at 80%+ and you've checked the vendor page for the current version." };
      t.TRACKREF.build = ["Portfolio playbook: roadmap.sh project ideas", "https://roadmap.sh/projects"];
      t.TRACKREF.cert = ["AWS Skill Builder (free)", "https://skillbuilder.aws/"];
      t.TRACKREF.fnd = ["CS50 and The Missing Semester", "https://missing.csail.mit.edu/"];
      t.TRACKREF.sw = ["Full Stack Open", "https://fullstackopen.com/en/"];
      t.TRACKREF.dbe = ["Use The Index, Luke", "https://use-the-index-luke.com/"];
      t.TRACKREF.cld = ["Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials"];
      t.TRACKREF.sec = ["PortSwigger Web Security Academy", "https://portswigger.net/web-security"];
      t.TRACKREF.mle = ["Made With ML", "https://madewithml.com/"];
      t.TRACKREF.aie = ["Hugging Face courses", "https://huggingface.co/learn"];
      Object.entries(old).forEach(([k, v]) => {
        t.TRACKS[k] = (v.rest || v.guide) ? v : Object.assign({}, v, { n: v.n, lib: 1 });
      });
    },

    /* Guide month, scaled by real weekly study time (the guide assumes ~17 h a week). */
    month(startKey, todayKey, weekMin) {
      const days = Math.max(0, (new Date(todayKey) - new Date(startKey)) / 86400000);
      const hours = weekMin ? Math.min(25, weekMin / 60) : 10;
      return 1 + (days / 30.44) * (hours / 17);
    },

    /* The two guide tracks in focus: the first unfinished one, and the next once its time has come. */
    focus(month, unfinished) {
      const open = GUIDE_ORDER.filter((k) => unfinished(k));
      const g1 = open[0] || "fnd";
      const g2 = open[1] && FROM[open[1]] <= month ? open[1] : g1;
      return [g1, g2];
    },

    /* Which track a ShiftWise block becomes. n counts blocks, so the mix repeats predictably. */
    trackFor(kind, n, month, unfinished, schedulable) {
      if (kind === "build") {
        if (n % 4 === 3 || !schedulable("build")) return "project";
        return "build";
      }
      if (kind === "cert") return schedulable("cert") ? "cert" : "review";
      const [g1, g2] = this.focus(month, unfinished);
      const slot = LEARN_PATTERN[n % LEARN_PATTERN.length];
      if (slot === "G1") return g1;
      if (slot === "G2") return g2;
      if (slot === "L") { const p = legacyPool(month); return p[Math.floor(n / LEARN_PATTERN.length) % p.length]; }
      return slot;
    },

    /* The hands-on task for any lesson, old or new. */
    taskFor(track, item) {
      if (!item) return "";
      if (item.task) return item.task;
      const topic = String(item.t || "").replace(/^(Review|Deepen \(\d+x\)): /, "");
      const tpl = TASKS[item.c] || (LEGACY_TASKS[track] ? LEGACY_TASKS[track][hash(topic) % LEGACY_TASKS[track].length] : "");
      return tpl ? tpl.replace(/\{t\}/g, topic) : "";
    }
  };

  window.GUIDE = GUIDE;
})();
