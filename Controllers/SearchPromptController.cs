using Microsoft.AspNetCore.Mvc;
using RoofingCrm.Models.Requests;
using RoofingCrm.Models.Responses;

namespace RoofingCrm.Controllers;

[ApiController]
[Route("api/search")]
public sealed class SearchPromptController : ControllerBase
{
    [HttpPost("prompt")]
    public IActionResult SubmitPrompt([FromBody] SearchPromptRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest(new { error = "Prompt is required." });
        }

        return Ok(new SearchPromptResponse { Prompt = request.Prompt.Trim() });
    }
}