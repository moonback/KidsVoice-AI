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
  });
});
