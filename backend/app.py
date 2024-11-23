from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Hugging Face API Configuration
HF_API_TOKEN = "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"

# Initialize Hugging Face Inference Client
hf_client = InferenceClient(token=HF_API_TOKEN)

# Task configuration for supported actions
TASKS = {
    "summarize": {
        "model": "meta-llama/Llama-3.2-1B-Instruct",
        "prompts": {
            "en": "Summarize the following text clearly and concisely:\n\n",
            "es": "Resuma el siguiente texto de manera clara y concisa:\n\n"
        }
    },
    "organize": {
        "model": "meta-llama/Llama-3.2-1B-Instruct",
        "prompts": {
            "en": "Organize the following text into clear bullet points:\n\n",
            "es": "Organice el siguiente texto en viñetas claras:\n\n"
        }
    }
}

def format_summary(result):
    """
    Format the summary to ensure better readability.
    """
    return f"**Summary:**\n\n{result.strip()}"

def format_organize(result):
    """
    Format the organized content as bullet points.
    """
    # Split the result into lines, and prepend each line with a bullet
    lines = [line.strip() for line in result.split('\n') if line.strip()]
    formatted_lines = "\n".join(f"- {line}" for line in lines)
    return f"**Organized Content:**\n\n{formatted_lines}"

@app.route('/<task>', methods=['POST'])
def handle_task(task):
    """
    Handle AI tasks (e.g., summarization or organization).
    :param task: Action to perform (summarize or organize).
    :return: Processed text from the model or an error message.
    """
    data = request.json
    notes = data.get("notes", "").strip()
    language = data.get("language", "en")

    # Validate task
    if task not in TASKS:
        return jsonify({"error": f"Invalid task '{task}'. Supported tasks: {list(TASKS.keys())}"}), 400

    # Construct the prompt
    prompts = TASKS[task]["prompts"]
    model = TASKS[task]["model"]
    prompt = prompts.get(language, prompts["en"]) + notes

    # Prepare messages for the chat format
    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    try:
        # Use Hugging Face Inference Client for streaming responses
        stream = hf_client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=500,
            stream=True
        )

        # Accumulate streamed content
        result = ""
        for chunk in stream:
            if "delta" in chunk.choices[0]:
                result += chunk.choices[0].delta.get("content", "")
            
        print(result)

        # Format the result based on the task
        if task == "summarize":
            formatted_result = format_summary(result)
        elif task == "organize":
            formatted_result = format_organize(result)
        else:
            formatted_result = result

        # Handle case where model simply echoes back the input
        if result.strip() == prompt.strip():
            formatted_result = "The model returned the input text. This could indicate a configuration issue."

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
