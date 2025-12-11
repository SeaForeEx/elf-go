# 🎄 ELF GO!
> A personal budget management and gift tracking application for organizing holiday shopping and gift-giving throughout the year.

[Live Demo](https://elf-go.vercel.app/)

## Screenshots

<table>
  <td>
    <img width="323" height="699" alt="Screenshot 2025-12-11 at 10 31 09 AM" src="https://github.com/user-attachments/assets/ff71fc37-3655-4388-bc6a-307ddf987595" />
  </td>
  <td>
    <img width="323" height="700" alt="Screenshot 2025-12-11 at 10 32 31 AM" src="https://github.com/user-attachments/assets/af97865c-ea3e-4211-a28d-00f5e36955fb" />
  </td>
  <td>
    <img width="323" height="698" alt="Screenshot 2025-12-11 at 10 36 41 AM" src="https://github.com/user-attachments/assets/214966a5-7c52-4cec-b824-a643dc22d299" />
  </td>
  <td>
    <img width="323" height="701" alt="Screenshot 2025-12-11 at 10 37 28 AM" src="https://github.com/user-attachments/assets/7b84cace-e218-4f05-ac46-10da2f6ed959" />
  </td>
  <td>
    <img width="323" height="699" alt="Screenshot 2025-12-11 at 10 49 00 AM" src="https://github.com/user-attachments/assets/f3548944-6f06-47bb-b70c-4c9e326fafb1" />
  </td>
</table>

## Why make a Gift Organizer?

It all started with a conversation with my wife. We were trying to figure out what to give everyone for Christmas. But didn't we already have a gift for my mother-in-law in the attic that we were going to give her a few years back but kept forgetting?

And how much are we going to spend? 

Before things got too heated, my developer brain entered the conversation.

Develop an app that lets the user keep track of the gifts they were buying for the special people in their life.

ELF GO! was born.

Not only does my app keep track of gifts, it also allows the user to create a budget to keep Holiday Shopping under control.

> ELF GO! is gift giving simplified.

## Features
- 🎁 Track gifts for multiple people across different occasions
- 👥 Organize recipients into groups (family, friends, coworkers)
- 💰 Budget management with real-time spending tracking
- 📍 Address autocomplete with international support
- 🎉 Support for 12 gift-giving occasions (more to come)
- 🔐 Secure authentication and user profiles

## Technical Highlights
- **Debounced Address Autocomplete:** Implemented custom address search with debouncing to optimize API calls and prevent rate limit issues
- **Component State Management:** Built reusable form components with callback patterns for parent-child communication
- **Server components:** Built with Next.js Server Components for faster performance and better SEO
- **Authentication & Security:** Implemented Supabase Auth with Row Level Security policies to ensure complete data isolation between users

## Development Journey
This project taught me:
- Full-stack development with Next.js App Router and Server Actions
- Working with external APIs and handling rate limits
- Debugging complex state management issues
  
## Local Development
```bash
git clone https://github.com/SeaForeEx/elf-go.git
npm install
# Add .env.local with required keys
npm run dev
```

**Required Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GEOAPIFY_API_KEY`

## Roadmap
- [ ] Add Birthday Date Picker to Person table
- [ ] Gift idea wishlist with sharing capabilities
- [ ] Mobile app version
- [ ] Gift reminder notifications
- [ ] Occasion-specific filtering and views

## Connect
Built by Charles Bridgers IV
- [LinkedIn](https://www.linkedin.com/in/charlesbridgersiv/)
- [Email](charlesbridgersiv@gmail.com)

Feel free to reach out with questions or opportunities!

