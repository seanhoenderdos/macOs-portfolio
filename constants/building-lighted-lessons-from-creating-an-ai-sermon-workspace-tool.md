# Building Lighted: Lessons from Creating an AI Sermon Workspace Tool

Lighted is an AI-powered sermon preparation workspace built to help pastors and Bible teachers move from scattered ideas to structured, research-backed sermon material.

The goal was not to build a chatbot that writes sermons for people. The goal was to create a practical workspace that supports the preparation process while keeping the pastor in control of the message.

That distinction shaped the entire product.

Sermon preparation is not just a writing task. It involves prayer, study, conviction, interpretation, pastoral sensitivity, and communication. Because of that, the role of AI had to be carefully designed. It needed to assist the process without replacing the human judgment and spiritual responsibility at the center of it.

The biggest lesson I learned while building Lighted is simple: the best AI tools support human judgment instead of replacing it.

## Understanding the Real User Problem

I started by speaking to real users to understand how they prepare sermons, what slows them down, and what they value most in the process.

One insight stood out quickly. While AI can generate a full sermon, many pastors did not feel comfortable with that being the main use case. They did not want AI to replace their own preparation, conviction, or voice. They wanted help with the parts of the workflow that were time-consuming, scattered, or difficult to organize.

That changed the product direction.

Instead of focusing on "generate my sermon," Lighted became more about helping pastors move from raw thoughts to organized preparation material. It needed to support research, structure, note-taking, document work, and continuation inside one workspace.

This is where user research became more than a discovery exercise. It directly influenced what the product should and should not do.

## Designing Around Natural Sermon Preparation

One of the important product decisions was allowing users to begin in the way that feels most natural to them.

Not every sermon starts as a clean document. Sometimes it starts as a voice note after a conversation. Sometimes it starts as a rough idea spoken aloud. Sometimes it starts from an existing Word document. Sometimes it starts from a blank page.

Lighted supports those different entry points.

A pastor can record audio directly in the app or send a Telegram voice note. Lighted then transcribes the audio with Whisper and turns it into a structured exegesis brief. That brief can include sections like the original transcript, word studies, historical context, and outline points.

The reason this matters is that the product meets the user at the beginning of their actual workflow. It does not force them to change how ideas arrive. It gives those ideas somewhere useful to go.

## From Voice Note to Structured Brief

The voice-to-brief workflow became one of the standout parts of the product.

The process looks simple from the user's side:

1. Record a thought in the app or send a Telegram voice note.
2. Lighted transcribes the audio.
3. The system generates structured sermon-prep material.
4. The user continues working inside the sermon workspace.

Behind that simple flow is a more complex product and engineering challenge. The system needs to handle transcription, AI generation, data persistence, user ownership, and a writing environment that feels reliable enough for serious work.

For transcription, Lighted uses Groq Whisper. For the workspace, it uses a rich editor built with TipTap. Briefs and user content are saved to a PostgreSQL database, with Prisma helping manage the data layer. The app also includes search, filters, bookmarks, statuses, and ownership checks so users can return to previous work and manage their sermon library.

The technical stack matters, but only because it supports the product experience. The user should not have to think about the pipeline. They should feel like their thoughts were captured, organized, and made easier to develop.

## Building a Workspace, Not Just a Chat Interface

One of the strongest product decisions was treating Lighted as a workspace rather than just another AI chat interface.

A chat interface can be useful, but sermon preparation requires more than a stream of generated responses. Users need to edit, organize, save, revisit, export, and build on their work over time.

That is why Lighted includes features like:

- a TipTap editor for rich document writing
- document import
- autosaving
- offline save recovery
- research sidebars
- copyable notes
- denomination and church preferences
- export to Word or PDF
- a persistent library of briefs

These features make the product feel closer to a real working environment. The AI output is not the final destination. It becomes material the user can shape.

That is important because the product is not trying to remove the pastor from the process. It is trying to give them a better place to do the work.

## Keeping Theological Context in Mind

Lighted also supports denomination and church preferences so generated content can better match the user's ministry context.

This was another example of designing for the domain instead of building a generic AI wrapper. Sermon preparation is context-sensitive. Language, emphasis, theological tradition, and audience all matter.

Personalization does not mean the system should make the final judgment. It means the system should be more aware of the user's context so the starting material is more relevant.

That is a subtle but important difference.

AI tools become more useful when they understand the workflow they are serving. In Lighted, the goal was not just to generate content. The goal was to generate useful preparation material that a pastor could review, adapt, and develop responsibly.

## Iterating Without Overdesigning

My approach to Lighted was highly iterative and feedback-driven.

I did not rely heavily on Figma for every part of the process because the project required fast movement and frequent adaptation. Instead, I used product judgment, systems thinking, and design experience directly in the build process.

That does not mean design was skipped. It means design happened closer to the product.

I focused on understanding the workflow, building useful features, testing assumptions, gathering feedback, and improving the experience as the product evolved. For a project like Lighted, that speed mattered because the real learning came from how users responded to the workflow.

The challenge was balancing movement with care. In an AI product, especially one built for ministry work, speed cannot come at the cost of trust.

## What Lighted Taught Me About AI Products

Building Lighted taught me that AI products need strong product boundaries.

It is easy to build something that generates impressive output. It is harder to build something that fits into a real human workflow in a responsible way.

The most important question is not "What can the model generate?" It is "What should the product help the user do?"

For Lighted, the answer was not to replace sermon preparation. It was to support it.

That meant helping pastors capture ideas, organize research, explore context, develop outlines, and continue writing in a focused workspace. It meant making the AI useful without making it the author of the message.

That lesson has shaped how I think about AI product development more broadly.

The strongest AI tools are not the ones that remove people from meaningful work. They are the ones that reduce friction around the work so people can bring more focus, judgment, and care to the parts that matter most.
