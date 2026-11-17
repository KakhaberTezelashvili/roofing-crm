namespace RoofingCrm.Models.Responses;

public sealed class SearchPromptResponse
{
    public bool Received { get; init; } = true;
    public string Prompt { get; init; } = "";
}