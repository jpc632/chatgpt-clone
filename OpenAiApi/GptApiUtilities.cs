namespace CodeReviewApi;

public class GptApiUtilities
{
    public static string ValidateModel(string model) =>
        model switch
        {
            "gpt-3.5-turbo" => "gpt-3.5-turbo",
            "gpt-4o-mini" => "gpt-4o-mini",
            "gpt-4o" => "gpt-4o",
            _ => throw new ArgumentException("The received model is not valid")
        };
}