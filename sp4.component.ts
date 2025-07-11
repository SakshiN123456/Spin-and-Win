import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../../../Service/Quizquestions/quiz.service';

@Component({
  selector: 'app-sp4',
  standalone: true,
  imports: [CommonModule,RouterLink],
  
  templateUrl: './sp4.component.html',
  styleUrl: './sp4.component.css'
})
export class Sp4Component implements OnInit {
  current: number = 0;
  correctAnswers: boolean[] = [];
  isQuizCompleted: boolean = false;
  totalQuestionsToShow: number = 5;  // Limit to 5 questions
  questionsShown: number = 0;  // Keep track of the number of questions shown
  currentSet: number = 4;  // Track which set of questions we're displaying
  allQuestions: { 
    [setId: number]: { 
      [questionKey: string]: [string, string, string, string, string, string] 
    } 
  } = {};  // Store questions for multiple sets

  currentQuestion: string = '';
  currentAnswers: string[] = [];
  correctAnswer: string = ''; // Correct answer for the current question

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    // Fetch quiz data from Spring Boot API
    this.quizService.getQuizData().subscribe((data) => {
      const gkQuestions = data.filter(quizItem => quizItem.category === 'Sports');

      // Format the filtered data so that it matches the required structure for multiple sets
      gkQuestions.forEach((quizItem, index) => {
        const setIndex = quizItem.setId;  // Assume each quizItem has a `setId` to categorize it
        if (!this.allQuestions[setIndex]) {
          this.allQuestions[setIndex] = {};
        }

        // Dynamically generate keys like `question0`, `question1`, etc.
        const questionKey = `question${index}`;

        this.allQuestions[setIndex][questionKey] = [
          quizItem.question,
          quizItem.optionA,
          quizItem.optionB,
          quizItem.optionC,
          quizItem.optionD,
          quizItem.answer  // Correct answer (A, B, C, or D)
        ];
      });

      this.loadQuestion(); // Load the first question for the selected set
      this.loadAnswers(); // Load the answers for the first question of the selected set
    });
  }

  // Shuffle questions for the current set
  shuffleQuestions() {
    const questionSet = this.allQuestions[this.currentSet];
    const questionKeys = Object.keys(questionSet);

    // Implementing the Fisher-Yates shuffle to randomize question order
    for (let i = questionKeys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionKeys[i], questionKeys[j]] = [questionKeys[j], questionKeys[i]]; // Swap
    }

    // Rebuild the question set with shuffled keys
    const shuffledSet: { [key: string]: [string, string, string, string, string, string] } = {};
    questionKeys.forEach((key, index) => {
      shuffledSet[`question${index}`] = questionSet[key];
    });
    this.allQuestions[this.currentSet] = shuffledSet;
  }

  loadQuestion() {
    // Ensure we're only showing questions if we're still within the limit of 5
    if (this.questionsShown < this.totalQuestionsToShow) {
      const questionSet = this.allQuestions[this.currentSet];  // Get the questions for the selected set
      const questionKeys = Object.keys(questionSet);  // Get all question keys
      const question = questionKeys[this.current];  // Get the question at the current index
      this.currentQuestion = questionSet[question][0];  // The actual question
      this.correctAnswer = questionSet[question][5];    // The correct answer
    }
  }

  loadAnswers() {
    // Ensure the answers are only loaded if we haven't reached the question limit
    if (this.questionsShown < this.totalQuestionsToShow) {
      const questionSet = this.allQuestions[this.currentSet];  // Get the questions for the selected set
      const questionKeys = Object.keys(questionSet);  // Get all question keys
      const question = questionKeys[this.current];  // Get the question at the current index
      this.currentAnswers = questionSet[question].slice(1, 5) as string[];  // Options A to D
    }
  }

  checkAnswer(selectedAnswerIndex: number) {
    // If the quiz is completed, do not allow any more actions
    if (this.isQuizCompleted) return;

    // Get the option selected by the user
    const selectedAnswer = this.currentAnswers[selectedAnswerIndex];

    // Compare the selected answer with the correct answer (A, B, C, or D)
    const isCorrect = selectedAnswer === this.correctAnswer;
    this.correctAnswers.push(isCorrect);  // Store if the answer was correct

    // Increment the number of questions shown
    this.questionsShown += 1;

    // Check if we have shown the 5th question, and complete the quiz
    if (this.questionsShown < this.totalQuestionsToShow) {
      this.current += 1;  // Move to the next question
      this.loadQuestion();
      this.loadAnswers();
    } else {
      // After the 5th question, end the quiz
      this.isQuizCompleted = true;
    }
  }

  // Method to switch between different sets
  switchSet(setId: number) {
    this.currentSet = setId;
    this.current = 0;  // Reset question index for the new set
    this.questionsShown = 0;  // Reset the question counter
    this.isQuizCompleted = false;  // Reset quiz completion status
    this.correctAnswers = [];  // Clear the correct answers array
    this.shuffleQuestions();  // Shuffle the questions for this set
    this.loadQuestion();  // Load the first question of the new set
    this.loadAnswers();  // Load the answers for the first question of the new set
  }
}

