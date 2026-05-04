const state = { currentView: "home" };
const app = document.getElementById("app");

function Header() {
  return `<nav class="navbar navbar-dark bg-dark p-3">
    <div class="container">
      <span class="navbar-brand">Old Angry IT Consulting</span>
      <div class="ms-auto">
        ${Btn("Home", "home")}
        ${Btn("Services", "services")}
        ${Btn("Solutions", "solutions")}
        ${Btn("Consultation Chat", "agent")}
        ${Btn("Contact", "contact")}
      </div>
    </div>
  </nav>`;
}

function Btn(t, v) {
  return `<button class="nav-btn ${state.currentView === v ? "active" : ""}" data-view="${v}">${t}</button>`;
}

function Card(t, txt, b, v) {
  return `<div class="col-md-4 mb-4">
    <div class="card info-card">
      <div class="card-body">
        <h5>${t}</h5>
        <p>${txt}</p>
        <button class="btn btn-dark" data-view="${v}">${b}</button>
      </div>
    </div>
  </div>`;
}

function Footer() {
  return `<footer class="footer-bar text-center p-3">
    <p>&copy; 2026 Old Angry IT Consulting</p>
    <p>Kristina Randolph | Spring-2262-COP2822C Web Technologies-3442</p>
  </footer>`;
}

function Home() {
  return `<main class="container page-section">
    <section class="hero-section mb-4">
      <h1 class="display-5">Practical IT support for growing businesses</h1>
      <p>Old Angry IT Consulting helps organizations improve support operations, strengthen systems, and solve technical issues with clear, dependable service.</p>
      <div>
        <button class="btn btn-light" data-view="services">View Services</button>
        <button class="btn btn-outline-light" data-view="agent">Chat With Us</button>
      </div>
    </section>

    <section>
      <h2>What We Offer</h2>
      <p>We deliver comprehensive IT consulting services including managed support, infrastructure planning, security best practices, and workflow optimization to help businesses operate efficiently and securely.</p>

      <div class="row mt-4">
        ${Card("Managed IT Support", "Reliable day-to-day support for hardware, software, user issues, and service requests.", "Open Services", "services")}
        ${Card("Business Technology Solutions", "Planning and guidance for infrastructure, cloud tools, and process improvements.", "View Solutions", "solutions")}
        ${Card("AI Readiness Agent", "Chat with us to identify business technology needs and receive basic consulting recommendations.", "Chat With Us", "agent")}
      </div>
    </section>
  </main>`;
}

function Services() {
  return `<main class="container page-section">
    <section class="mb-4">
      <h1>IT Consulting Services</h1>
      <p>Old Angry IT Consulting provides technical support and consulting services designed to help businesses stay productive and secure.</p>
    </section>

    <div class="row">
      ${Card("Help Desk Support", "User support for password resets, software problems, and device troubleshooting.", "Ask AI Agent", "agent")}
      ${Card("System Maintenance", "Routine maintenance, updates, and monitoring to keep business systems running smoothly.", "Solutions", "solutions")}
      ${Card("Technology Planning", "Guidance for selecting tools, improving workflows, and supporting long-term business growth.", "Contact", "contact")}
    </div>
  </main>`;
}

function Solutions() {
  return `<main class="container page-section">
    <section class="mb-4">
      <h1>Business Solutions</h1>
      <p>These solutions show how Old Angry IT Consulting can support organizations with practical improvements in service, systems, and operations.</p>
    </section>

    <div class="row">
      ${Card("Infrastructure Review", "Assess current systems and recommend upgrades that improve reliability and performance.", "Ask AI Agent", "agent")}
      ${Card("Security Best Practices", "Strengthen account security, device protection, and staff awareness through practical guidance.", "Services", "services")}
      ${Card("Workflow Improvement", "Identify support bottlenecks and streamline processes for faster service delivery.", "Contact", "contact")}
    </div>
  </main>`;
}

function Agent() {
  return `<main class="container page-section">
    <section class="mb-4">
      <h1>Consultation Chat</h1>
      <p>Chat with us to discuss your business technology challenges and receive guided IT consulting recommendations.</p>
    </section>

    <section class="ai-panel">
      <h2>Ask the AI Agent</h2>
      <p class="text-muted">Choose a quick prompt or type your own business technology challenge.</p>

      <div class="quick-prompts">
        <button data-prompt="Our employees keep having password and login problems.">Login Problems</button>
        <button data-prompt="We need better cybersecurity practices for our small business.">Cybersecurity</button>
        <button data-prompt="Our computers and systems are slow and unreliable.">Slow Systems</button>
        <button data-prompt="Our help desk process is disorganized and tickets are delayed.">Workflow Issues</button>
        <button data-prompt="We are not sure if our business is ready for AI tools.">AI Readiness</button>
      </div>

      <div class="chat-toolbar">
        <small class="text-muted">Your chat saves on this device while you work.</small>
        <button type="button" class="clear-chat" id="clearChat">Clear Chat</button>
      </div>

      <div class="chat-window" id="chatWindow"></div>

      <form class="chat-form" id="agentForm">
        <input id="agentInput" type="text" placeholder="Example: Our ticket process is too slow..." required>
        <button class="btn btn-dark" type="submit">Send</button>
      </form>
    </section>


  </main>`;
}

function Contact() {
  return `<main class="container page-section">
    <section class="mb-4">
      <h1>Schedule a Consultant Session</h1>
      <p>Reach out to discuss service desk support, consulting projects, and business technology needs.</p>
    </section>

    <div class="row">
      ${Card("Email", "Send an email to discuss your support needs, consulting questions, or project ideas.<br><strong>info@oldangry.com</strong>", "Go Home", "home")}
      ${Card("Phone Consultation", "Schedule a call to review your current IT challenges and possible service options.<br><strong>904-555-4357</strong>", "Open Services", "services")}
      ${Card("AI Pre-Assessment", "Use the AI Agent to describe your issue before requesting a consultation.", "Try Agent", "agent")}
    </div>
  </main>`;
}

function Main() {
  if (state.currentView === "home") return Home();
  if (state.currentView === "services") return Services();
  if (state.currentView === "solutions") return Solutions();
  if (state.currentView === "agent") return Agent();
  return Contact();
}


function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getSavedChat() {
  try {
    return JSON.parse(localStorage.getItem("oldAngryConsultationChat")) || [];
  } catch (error) {
    return [];
  }
}

function saveChatMessage(text, sender) {
  const history = getSavedChat();
  history.push({
    text,
    sender,
    time: getCurrentTime()
  });
  localStorage.setItem("oldAngryConsultationChat", JSON.stringify(history));
}

function clearChatHistory() {
  localStorage.removeItem("oldAngryConsultationChat");
  loadChatHistory();
}

function addTypingIndicator() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  const typing = document.createElement("div");
  typing.className = "chat-message agent typing";
  typing.id = "typingIndicator";
  typing.innerHTML = `
    <div><strong>AI Agent:</strong> Typing<span class="typing-dots">...</span></div>
    <span class="timestamp">${getCurrentTime()}</span>
  `;
  chatWindow.appendChild(typing);
  smoothScrollChat();
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) {
    typing.remove();
  }
}

function smoothScrollChat() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  chatWindow.scrollTo({
    top: chatWindow.scrollHeight,
    behavior: "smooth"
  });
}

function loadChatHistory() {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  const history = getSavedChat();
  chatWindow.innerHTML = "";

  if (history.length === 0) {
    addChatMessage(
      "Tell me what is happening in your business technology environment, and I will suggest a practical consulting recommendation.",
      "agent",
      false
    );
    return;
  }

  history.forEach((entry) => {
    addChatMessage(entry.text, entry.sender, false, entry.time);
  });
}


function scheduleLink() {
  return `<br><br><strong>Next Step:</strong> <a href="#" class="schedule-link" data-view="contact">Schedule a consultant session</a> or call <strong>904-555-4357</strong>.`;
}

function addChatMessage(text, sender, save = true, savedTime = null) {
  const chatWindow = document.getElementById("chatWindow");
  if (!chatWindow) return;

  const message = document.createElement("div");
  const time = savedTime || getCurrentTime();

  message.className = `chat-message ${sender}`;
  message.innerHTML = sender === "agent"
    ? `<div><strong>AI Agent:</strong> ${text}</div><span class="timestamp">${time}</span>`
    : `<div><strong>You:</strong> ${text}</div><span class="timestamp">${time}</span>`;

  chatWindow.appendChild(message);
  smoothScrollChat();

  message.querySelectorAll("[data-view]").forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();
      state.currentView = link.dataset.view;
      render();
    };
  });

  if (save) {
    saveChatMessage(text, sender);
  }
}

function getAgentResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("password") || text.includes("login") || text.includes("account")) {
    return "Recommendation: Start with an account access review. Old Angry IT Consulting would document the login process, review password reset procedures, verify multi-factor authentication, and create a standard support workflow for faster user assistance." + scheduleLink();
  }

  if (text.includes("security") || text.includes("cyber") || text.includes("phishing") || text.includes("mfa")) {
    return "Recommendation: Prioritize a security best-practices assessment. This should include MFA review, user awareness training, endpoint protection checks, access control review, and a practical incident response checklist." + scheduleLink();
  }

  if (text.includes("slow") || text.includes("performance") || text.includes("computer") || text.includes("systems")) {
    return "Recommendation: Complete an infrastructure and device health review. Check hardware age, updates, storage, network performance, and application usage. Then create a maintenance plan to reduce recurring performance issues." + scheduleLink();
  }

  if (text.includes("ticket") || text.includes("workflow") || text.includes("process") || text.includes("help desk") || text.includes("service desk")) {
    return "Recommendation: Focus on workflow improvement. Map the current request process, identify bottlenecks, define ticket categories, create escalation rules, and build simple reporting to track response and resolution trends." + scheduleLink();
  }

  if (text.includes("ai") || text.includes("automation") || text.includes("chatbot")) {
    return "Recommendation: Begin with an AI readiness review. Identify repetitive support requests, review knowledge documentation, define safe automation opportunities, and start with a small pilot before expanding AI usage." + scheduleLink();
  }

  return "Recommendation: Start with a technology discovery session. Old Angry IT Consulting would review your current tools, support pain points, security needs, and business goals before creating a prioritized improvement plan." + scheduleLink();
}

function setupAgentEvents() {
  const form = document.getElementById("agentForm");
  const input = document.getElementById("agentInput");
  const prompts = document.querySelectorAll("[data-prompt]");
  const clearChat = document.getElementById("clearChat");

  loadChatHistory();

  if (clearChat) {
    clearChat.onclick = clearChatHistory;
  }

  prompts.forEach((button) => {
    button.onclick = () => {
      const prompt = button.dataset.prompt;
      addChatMessage(prompt, "user");
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addChatMessage(getAgentResponse(prompt), "agent");
      }, 700);
    };
  });

  if (form && input) {
    input.onkeydown = (event) => {
      if (event.key === "Escape") {
        input.value = "";
      }
    };

    form.onsubmit = (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;

      addChatMessage(value, "user");
      input.value = "";
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addChatMessage(getAgentResponse(value), "agent");
      }, 700);
    };
  }
}

function render() {
  app.innerHTML = Header() + Main() + Footer();

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => {
      state.currentView = btn.dataset.view;
      render();
    };
  });

  setupAgentEvents();
}

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      console.log("Service worker registration failed.");
    });
  });
}
