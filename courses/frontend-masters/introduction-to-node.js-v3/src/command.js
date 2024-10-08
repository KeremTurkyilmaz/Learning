import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { getAllNotes, newNote, findNotes, removeNote, removeAllNotes } from './notes.js'

const listNotes = (notes) => {
  notes.forEach(note => {
    console.log('\n')
    console.log('id:', note.id)
    console.log('note:', note.content)
    console.log('tags:', note.tags.join(', '))
  });
}

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', (yargs) => {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create'
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(', ') : []
    const note = await newNote(argv.note, tags)
    console.log('Note added !', note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note'
  })
  .command('all', 'Get all notes', (yargs) => { }, async (argv) => {
    const notes = await getAllNotes();
    listNotes(notes)
  })
  .command('find <filter>', 'get matching notes', (yargs) => {
    return yargs.positional('filter', {
      type: 'string',
      description: 'The search term to filter notes by, will be applied to the content'
    })
  }, async (argv) => {
    const matchers = await findNotes(argv.filter)
    listNotes(matchers)
  })
  .command('remove <id>', 'remove a note by id', (yargs) => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const id = await removeNote(argv.id)
    console.log(id)
  })
  .command('web [port]', 'Launch website to see notes', (yargs) => {
    return yargs.positional('port', {
      type: 'number',
      default: 5000,
      description: 'port to bind on'
    })
  }, (argv) => {
  })
  .command('clean', 'remove all notes', (yargs) => { }, async (argv) => {
    await removeAllNotes();
    console.log('Db Cleared')
  })
  .demandCommand(1)
  .parse()
