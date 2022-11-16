import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Flashcard} from '../../../../../services/flashcards/model/flashcard';
import {FlashcardsService} from '../../../../../services/flashcards/flashcards.service';
import {FlashcardImageUploaderService} from '../../../../../services/flashcards/flashcard-creator/flashcard-image-uploader.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewFlashcardDialogComponent} from '../new-flashcard-dialog.component';

@Component({
  selector: 'app-modify-flashcard-dialog',
  templateUrl: './modify-flashcard-dialog.component.html',
  styleUrls: ['./modify-flashcard-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifyFlashcardDialogComponent extends NewFlashcardDialogComponent implements OnInit {

  constructor(
    private modifyDialogRef: MatDialogRef<ModifyFlashcardDialogComponent>,
    private modifyFlashcardsService: FlashcardsService,
    private modifyFlashcardImageUploaderService: FlashcardImageUploaderService,
    private modifySnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public modifyFlashcard: Flashcard
  ) {
    super(modifyFlashcardsService, modifyFlashcardImageUploaderService, modifySnackBar, modifyFlashcard);
  }

  ngOnInit(): void {
    this.flashcardFormGroup.patchValue({
      content: this.modifyFlashcard.content,
      translation: this.modifyFlashcard.translation,
      example: this.modifyFlashcard.example,
      image: this.modifyFlashcard.image
    })
  }

  close() {
    this.modifyDialogRef.close();
  }
}