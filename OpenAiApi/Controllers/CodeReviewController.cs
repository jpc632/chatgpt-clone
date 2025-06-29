using System.Runtime.InteropServices.JavaScript;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CodeReviewApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CodeReviewController : ControllerBase
{
    private readonly HttpClient _openAiClient;

    public CodeReviewController(IHttpClientFactory httpClientFactory)
    {
        _openAiClient = httpClientFactory.CreateClient("OpenAIClient");
    }

    [HttpPost]
    public async Task<IActionResult> Review([FromBody] CodeReviewRequest request)
    {
        var body = new
        {
            model = GptApiUtilities.ValidateModel(request.GptModel), 
            messages = request.Messages
        };

        var response = await _openAiClient.PostAsJsonAsync("v1/chat/completions", body);
        var json = await response.Content.ReadAsStringAsync();

        return Ok(JsonDocument.Parse(json));
    }
}

public class CodeReviewRequest
{
    public string? Code { get; set; }
    public string GptModel { get; set; }
    public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
}

public class ChatMessage
{
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}