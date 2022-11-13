import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {Flashcard} from '../../../services/flashcards/model/flashcard';
import {MatTableDataSource} from '@angular/material/table';
import {FlashcardsService} from '../../../services/flashcards/flashcards.service';
import {AuthService} from '../../../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {map, take} from 'rxjs';
import {RemoveFlashcardDialogComponent} from '../flashcard-manager/flashcard-editor/remove-flashcard-dialog/remove-flashcard-dialog.component';
import {SnackBarComponent} from '../../common/snack-bar/snack-bar.component';
import {ModifyFlashcardDialogComponent} from '../flashcard-manager/flashcard-editor/modify-flashcard-dialog/modify-flashcard-dialog.component';

@Component({
  selector: 'app-flashcards-editor',
  templateUrl: './flashcards-editor.component.html',
  styleUrls: ['./flashcards-editor.component.scss']
})
export class FlashcardsEditorComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = true;
  flashcards: Flashcard[] = [];
  dataSource = new MatTableDataSource<Flashcard>();
  displayedColumns: string[] = ['content', 'translation', 'image-and-example', 'action'];

  constructor(private flashcardsService: FlashcardsService,
              private auth: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getUser()
      .pipe(take(1), map(user => user?.email))
      .subscribe(email => {
        if (email) {
          this.auth.email = email;
          this.flashcardsService.getFlashcards()
            .pipe(take(1))
            .subscribe(flashcards => {
              this.flashcards = flashcards;
              this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
              this.dataSource.paginator = this.paginator;
              this.loading = false;
            });
        } else {
          this.router.navigateByUrl('/login').then();
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFlashcard(flashcardForRemoval: Flashcard) {
    this.dialog.open(RemoveFlashcardDialogComponent, {
      data: flashcardForRemoval
    }).afterClosed().subscribe(result => {
      if (result) {
        this.flashcardsService.deleteFlashcard(flashcardForRemoval.id)
          .then(() => {
            this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardForRemoval.id);
            this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
            this.dataSource.paginator = this.paginator;
          })
          .catch(() => this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 3 * 1000,
            data: false
          }));
      }
    })
  }

  editFlashcard(flashcardToEdit: Flashcard) {
    this.dialog.open(ModifyFlashcardDialogComponent, {
      data: flashcardToEdit
    }).afterClosed().subscribe(result => {
      if (result) {
        this.flashcardsService.editFlashcard(flashcardToEdit)
          .then(() => {
            this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardToEdit.id);
            this.flashcards.push(flashcardToEdit);
            this.dataSource = new MatTableDataSource<Flashcard>(this.flashcards);
            this.dataSource.paginator = this.paginator;
          })
          .catch(() => this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 3 * 1000,
            data: false
          }));
      }
    })
  }
}