import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '../lib/systemPrompt';

describe('systemPrompt', () => {
  describe('buildSystemPrompt', () => {
    it('should build prompt with avatar personality', () => {
      const prompt = buildSystemPrompt('robot');
      expect(prompt).toContain('Lisa le Robot');
      expect(prompt).toContain('Bip-boup');
    });

    it('should include child name when provided', () => {
      const prompt = buildSystemPrompt('robot', 'Marie');
      expect(prompt).toContain('Marie');
      expect(prompt).toContain('s\'appelle');
    });

    it('should handle missing child name', () => {
      const prompt = buildSystemPrompt('robot', '');
      expect(prompt).toContain('n\'a pas encore dit son nom');
    });

    it('should include safety guidelines', () => {
      const prompt = buildSystemPrompt('robot');
      expect(prompt).toContain('SÉCURITÉ');
      expect(prompt).toContain('informations privées');
    });

    it('should include concision rules', () => {
      const prompt = buildSystemPrompt('robot');
      expect(prompt).toContain('CONCISION');
      expect(prompt).toContain('COURTES');
    });

    it('should include interaction guidelines', () => {
      const prompt = buildSystemPrompt('robot');
      expect(prompt).toContain('INTERACTION');
      expect(prompt).toContain('question');
    });

    it('should include well-being guidelines', () => {
      const prompt = buildSystemPrompt('robot');
      expect(prompt).toContain('BIEN-ÊTRE');
      expect(prompt).toContain('pause');
    });

    it('should include date and time context', () => {
      const prompt = buildSystemPrompt('robot', 'Marie');
      
      // Should contain temporal context section
      expect(prompt).toContain('CONTEXTE TEMPOREL');
      
      // Should contain current date elements
      const now = new Date();
      const year = now.getFullYear();
      expect(prompt).toContain(year.toString());
      
      // Should contain time of day guidance
      expect(prompt).toMatch(/matin|après-midi|soirée|nuit/);
      expect(prompt).toMatch(/Bonjour|Bon après-midi|Bonsoir|Bonne nuit/);
    });

    it('should adapt greeting based on time of day', () => {
      const prompt = buildSystemPrompt('robot', 'Marie');
      const now = new Date();
      const hours = now.getHours();
      
      if (hours >= 5 && hours < 12) {
        expect(prompt).toContain('Bonjour');
        expect(prompt).toContain('matin');
      } else if (hours >= 12 && hours < 18) {
        expect(prompt).toContain('après-midi');
      } else if (hours >= 18 && hours < 22) {
        expect(prompt).toContain('Bonsoir');
        expect(prompt).toContain('soirée');
      } else {
        expect(prompt).toContain('nuit');
      }
    });
  });
});
