import { AfterViewChecked, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot implements AfterViewChecked{

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef;

  isOpen = signal(false);
  isTyping = signal(false);
  inputText = signal('');
  messages = signal<Message[]>([
    {
    role: 'assistant',
    content: 'Hi! I am your Ghanim Enterprises shopping assistant. How can I help you today? 😊',
    timestamp: new Date()
    }
   
  ]);

  suggestedQuestions = [
    'What cooking products do you have?',
    'Do you offer free delivery?',
    'What are your best sellers?',
    'Do you have gift items?'
  ];

  constructor(private api: ApiService) {}

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.set(!this.isOpen());
  }

    onInput(event: Event) {
    this.inputText.set(
      (event.target as HTMLInputElement).value
    );
  }

    onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

   askSuggested(question: string) {
    this.inputText.set(question);
    this.sendMessage();
  }

   sendMessage() {
    const text = this.inputText().trim();
    if (!text || this.isTyping()) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, userMessage]);
    this.inputText.set('');
    this.isTyping.set(true);

    const history = this.messages()
      .slice(1, -1)
      .map(m => ({ role: m.role, content: m.content }));

    this.api.post<{ message: string; success: boolean }>(
      '/chat',
      { message: text, history }
    ).subscribe({
      next: (response) => {
        const botMessage: Message = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };
        this.messages.update(msgs => [...msgs, botMessage]);
        this.isTyping.set(false);
      },
      error: () => {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry I am having trouble right now. Please try again.',
          timestamp: new Date()
        };
        this.messages.update(msgs => [...msgs, errorMessage]);
        this.isTyping.set(false);
      }
    });
  }

  clearChat() {
    this.messages.set([{
      role: 'assistant',
      content: 'Hi! I am your Ghanim Enterprises shopping assistant. How can I help you today? 😊',
      timestamp: new Date()
    }]);
  }

   private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

   formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}
