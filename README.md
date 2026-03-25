# Buying Signal Radar v1.0

**AI-powered intent detection system for n8n.** Monitors 6 data sources for buying signals, scores leads by intent strength, and auto-reaches out at the perfect moment, before your competitors even know the lead exists.

![n8n](https://img.shields.io/badge/n8n-workflow-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Signals](https://img.shields.io/badge/signal%20sources-6-green)

## What This Does

Most outreach is spray-and-pray. You email 1,000 people hoping 5 are interested. This workflow flips the model: it finds the 5 people who are **already showing buying intent right now**, then reaches out with a message so relevant it feels like you read their mind.

**6 Signal Branches running in parallel:**

| Branch | What It Monitors | Signal Strength |
|--------|------------------|-----------------|
| Reddit Intent | People actively asking for your service on Reddit | 9/10 |
| Competitor Reviews | 1-2 star reviews on your competitors' Google profiles | 8/10 |
| Hiring Signals | Companies posting jobs related to your service area | 7/10 |
| News & Funding | Companies raising money, launching products, expanding | 7/10 |
| Social Listening | Complaints, questions, and switching intent on social | 6/10 |
| Website Changes | Prospect websites that recently changed (active investment) | 5/10 |

**Then:**
1. All signals feed into an **Intent Scoring Engine** (0-10 scale with bonus multipliers)
2. High-score leads get **AI-researched** (GPT-4o-mini analyzes the signal context)
3. AI writes a **hyper-personalized email** referencing the SPECIFIC signal
4. **Telegram alert** with full context (score, signal, research, draft email)
5. Everything **logged to Google Sheets** for tracking

## The Key Insight

The email doesn't say "I found you on a list." It says "I noticed you posted on Reddit looking for a web designer" or "I saw your competitor just got a 1-star review." That specificity is what makes the response rate 10x higher than generic cold email.

## Setup (15 minutes)

### Prerequisites
- n8n instance (self-hosted or cloud)
- OpenAI API key (for GPT-4o-mini, ~$0.01 per lead researched)
- Telegram bot + chat ID (for alerts)
- Google Places API key (free tier: 5,000 requests/month) (optional, for Branch 2)

### Import

1. Download `workflow.json` from this repo
2. In n8n, go to **Workflows > Import from File**
3. Upload `workflow.json`
4. Open the **Configuration** node and replace the placeholder values:

```
openai_api_key: "your-openai-key"
telegram_bot_token: "your-bot-token"
telegram_chat_id: "your-chat-id"
google_places_api_key: "your-google-key"  (optional)
```

5. Customize the signal parameters:

```
industry: "your industry"
service_keywords: ["your", "service", "keywords"]
search_queries_reddit: ["queries people use to find your service"]
competitor_names: ["Your Competitor 1", "Your Competitor 2"]
job_keywords: ["Job Title 1", "Job Title 2"]
prospect_urls: ["https://prospect-site-to-monitor.com"]
news_keywords: ["your industry news keywords"]
score_threshold: 5.0  (adjust based on your volume preference)
```

6. Activate the workflow. It runs every 6 hours by default.

### Optional Setup

**Email sending:** The "Send Email via Gmail" node is disabled by default. To enable auto-sending:
1. Set up a Gmail send webhook (or use n8n's built-in Gmail node)
2. Update the webhook URL in the node
3. Enable the node

**Google Sheets logging:** The "Log to Google Sheets" node is disabled by default. To enable:
1. Create a Google Sheet with columns: Date, Signal Type, Source, Score, Lead, Company, Summary, Subject, Body, Status
2. Replace `YOUR_SHEET_ID` and auth token in the node
3. Enable the node

## How the Scoring Works

Each signal starts with a base strength (5-9). Bonuses are added for:

| Bonus | Points | Trigger |
|-------|--------|---------|
| Budget mention | +1.0 | Lead mentions budget, price, cost, invest |
| Urgency | +1.5 | ASAP, urgent, deadline, rush |
| Multi-keyword | +0.5/each | Multiple service keywords matched |
| Switching intent | +1.0 | "alternative to", "replace", "switch from" |
| Funding news | +1.5 | Company raised funding |
| Very negative review | +0.5 | 1-star review (vs 2-star) |

**Score capped at 10.** Default threshold: 5.0 (configurable).

## Architecture

```
Schedule (6h) -> Configuration
                    |
     +--------------+--------------+
     |      |       |      |       |       |
  Reddit  Reviews  Jobs  Website  News   Social
     |      |       |      |       |       |
     +------+-------+------+-------+------+
                    |
           Merge All Signals
                    |
         Calculate Intent Score
                    |
          Filter (score >= threshold)
                    |
           +--------+--------+
           |                 |
     AI Research    AI Email Writer
           |                 |
           +--------+--------+
                    |
          Format Outreach Package
                    |
           +--------+--------+--------+
           |                 |                |
      Send Email    Telegram Alert    Log to Sheet
```

## Customization Ideas

**Different industries:** Change the keywords in Configuration. Works for any B2B service.

**More signal sources:**
- Add a Glassdoor branch (company reviews = culture problems = consulting opportunity)
- Add a G2/Capterra branch (software review sites for SaaS)
- Add a Crunchbase branch (detailed funding data)
- Add a LinkedIn Sales Navigator branch (job changes, company updates)

**CRM integration:** Replace Google Sheets with HubSpot, Pipedrive, or Salesforce nodes.

**Slack instead of Telegram:** Swap the Telegram node for a Slack node.

**Multi-language:** Add language detection and route to different email templates.

## Cost

- **n8n:** Free (self-hosted) or from $20/mo (cloud)
- **OpenAI:** ~$0.01 per lead researched (GPT-4o-mini)
- **Google Places:** Free tier covers 5,000 requests/month
- **Reddit API:** Free (no auth needed for search)
- **Google News RSS:** Free

**Total for 100 leads/day: ~$1/day**

Compare that to:
- ZoomInfo: $15,000/year
- Apollo: $99/month
- Full-time SDR: $4,000-6,000/month

## FAQ

**Q: Is scraping Reddit against their TOS?**
A: We use Reddit's public JSON API (adding .json to search URLs), which is the same endpoint their mobile app uses. We respect rate limits and include a User-Agent header. For high volume, consider using Reddit's official API with OAuth.

**Q: Can I use this for industries other than web design?**
A: Yes. Change the keywords in the Configuration node. The architecture works for any B2B service: marketing, accounting, legal, SaaS, consulting, etc.

**Q: Why is the email node disabled by default?**
A: Sending cold emails without reviewing them first is risky. Start with Telegram alerts, review the AI drafts, and send manually. Once you trust the quality, enable auto-send.

**Q: How do I add more competitors to monitor?**
A: Add their Google Place IDs to the `competitor_place_ids` array in Configuration. Find Place IDs at: https://developers.google.com/maps/documentation/places/web-service/place-id

## Built By

**Ayush Chauhan** - I build AI automation systems for agencies and B2B businesses.

If you want this customized for your business (your CRM, your email accounts, your industry, your competitors), DM me or reach out:

- GitHub: [@ayushopchauhan](https://github.com/ayushopchauhan)
- Website: [ayushopchauhan.com](https://ayushopchauhan.com)
- Book a call: [cal.com/ayushopchauhan/15min](https://cal.com/ayushopchauhan/15min)

**Custom builds: $500-2,000 depending on complexity. Delivered in 3-5 days.**

## License

MIT. Free to use, modify, and share. Attribution appreciated but not required.
