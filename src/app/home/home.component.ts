import {
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MarrySectionComponent,
  MarrySectionConfig,
} from '../marry-section/marry-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest } from 'rxjs';
import { NoteKind, noteKinds, NoteService } from '../note.service';

export const fastForwardIcons = ['📹', '🎸', '📷', '🏨', '🌺'] as const;
export type FastForwardIcon = (typeof fastForwardIcons)[number];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MarrySectionComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  elementRef: ElementRef = inject(ElementRef);
  noteService = inject(NoteService);

  @ViewChildren('sectionRefs', { read: ElementRef })
  sectionRefs!: QueryList<ElementRef>;

  marrySectionConfigs: Map<FastForwardIcon, MarrySectionConfig> = new Map<
    FastForwardIcon,
    MarrySectionConfig
  >([
    [
      '📹',
      {
        title: '📹 Cameraman',
        notes: [],
        sectionIcon: '📹',
        iconColor: 'success',
      },
    ],
    [
      '🎸',
      {
        title: '🎸 Band',
        notes: [],
        sectionIcon: '🎸',
        iconColor: 'accent',
      },
    ],
    [
      '📷',
      {
        title: '📷 Photographer',
        notes: [],
        sectionIcon: '📷',
        iconColor: 'danger',
      },
    ],
    [
      '🏨',
      {
        title: '🏨 Inside Decorations',
        notes: [],
        sectionIcon: '🏨',
        iconColor: 'danger',
      },
    ],
    [
      '🌺',
      {
        title: '🌺 Outside Decorations',
        notes: [],
        sectionIcon: '🌺',
        iconColor: 'lilac',
      },
    ],
  ]);

  ngOnInit(): void {
    this.observeNotes();
  }

  scrollToEndOfSection(
    fastForwardIcon: (typeof fastForwardIcons)[number]
  ): void {
    const sectionRefIndex = fastForwardIcons.findIndex(
      icon => icon === fastForwardIcon
    );
    this.sectionRefs.get(sectionRefIndex)?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  observeNotes(): void {
    combineLatest(
      noteKinds.map((role: string) =>
        this.noteService.getNotes(role as NoteKind)
      )
    ).subscribe(response => {
      fastForwardIcons.forEach((fastForwardIcon, index) => {
        const marrySectionConfig =
          this.marrySectionConfigs.get(fastForwardIcon);
        if (marrySectionConfig) {
          marrySectionConfig.notes = response[index];
        }
      });
    });
  }
}
