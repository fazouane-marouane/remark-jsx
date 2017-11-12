'use strict';

var createElement = require('react').createElement;
var test = require('tape');
var h = require('hastscript');
var to = require('..');

test('`element`', function (t) {
  t.deepEqual(
    to(h('i', 'bravo')),
    createElement('i', {}, 'bravo'),
    'should stringify `element`s'
  );

  t.deepEqual(
    to(h('foo')),
    createElement('foo'),
    'should stringify unknown `element`s'
  );

  t.deepEqual(
    to(h('img')),
    createElement('img'),
    'should stringify void `element`s'
  );

  t.deepEqual(
    to(h('foo'), {voids: ['foo']}),
    createElement('foo'),
    'should stringify given void `element`s'
  );

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true}),
    createElement('img'),
    'should stringify with ` /` in `closeSelfClosing` mode'
  );

  t.deepEqual(
    to(h('img'), {closeSelfClosing: true, tightSelfClosing: true}),
    createElement('img'),
    'should stringify voids with `/` in `closeSelfClosing` ' +
    'and `tightSelfClosing` mode'
  );

  t.deepEqual(
    to(h('img', {title: '/'}), {
      preferUnquoted: true,
      closeSelfClosing: true,
      tightSelfClosing: true
    }),
    createElement('img', {title: '/'}),
    'should stringify voids with a ` /` in if an unquoted ' +
    'attribute ends with `/`'
  );

  t.deepEqual(
    to({
      type: 'element',
      tagName: 'template',
      properties: {},
      children: [],
      content: {
        type: 'root',
        children: [
          h('p', [
            h('b', 'Bold'),
            ' and ',
            h('i', 'italic'),
            '.'
          ])
        ]
      }
    }),
    createElement('template', {},
      createElement('p', {}, createElement('b', {}, 'Bold'), ' and ',
      createElement('i', {}, 'italic'), '.')),
    'should support `<template>`s content'
  );

  t.end();
});
