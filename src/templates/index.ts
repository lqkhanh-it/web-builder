import Template1 from "@/templates/template1";
import Template2 from "@/templates/template2";
import type { TemplateMeta } from "@/templates/types";

export const template1Meta: TemplateMeta = {
  id: "template1",
  name: "Simple Blog",
  description: "A clean blog layout with image, title, and content"
};

export const template2Meta: TemplateMeta = {
  id: "template2", 
  name: "Card Layout",
  description: "A modern card-based design for showcasing features"
};

export const templates = {
  template1: Template1,
  template2: Template2,
};

export const templateMetas = [template1Meta, template2Meta]; 