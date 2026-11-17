using System.Text.Json;
using Microsoft.Extensions.AI;
using OpenAI;
using RoofingCrm.Services;

var builder = WebApplication.CreateBuilder(args);

var openAiApiKey =
    Environment.GetEnvironmentVariable("OPENAI_API_KEY")
    ?? builder.Configuration["OPENAI_API_KEY"];

if (string.IsNullOrWhiteSpace(openAiApiKey))
{
    throw new InvalidOperationException(
        "OPENAI_API_KEY is not set. Configure it as a user or machine environment variable.");
}

var openAiChatModel = builder.Configuration["OpenAI:ChatModel"] ?? "gpt-4o-mini";

builder.Services.AddSingleton<IChatClient>(_ =>
    new OpenAIClient(openAiApiKey).GetChatClient(openAiChatModel).AsIChatClient());

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddSingleton<ILeadService, LeadService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();