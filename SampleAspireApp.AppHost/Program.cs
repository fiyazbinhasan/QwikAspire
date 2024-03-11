var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedisContainer("cache");

var apiservice = builder.AddProject<Projects.SampleAspireApp_ApiService>("apiservice");

builder.AddProject<Projects.SampleAspireApp_Web>("webfrontend")
    .WithReference(cache)
    .WithReference(apiservice);

builder.AddNpmApp("qwik", "../SampleAspireApp.Spa")
    .WithReference(apiservice)
    .WithHttpEndpoint(containerPort: 5413, env: "PORT")
    .AsDockerfileInManifest();

builder.Build().Run();
