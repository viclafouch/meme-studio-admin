import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Locales } from '@viclafouch/meme-studio-utilities/constants'
import { useRatiotedTextboxes } from '@viclafouch/meme-studio-utilities/hooks'
import { Meme } from '@viclafouch/meme-studio-utilities/schemas'
import { updateMeme } from '../../../api/memes'
import { queries } from '../../../config/queries'
import { getKeys } from '../../../helpers/object'
import {
  MemeMetadata,
  UpdateMemeSchema,
  updateMemeSchema
} from '../../../validator/update-meme'

export type FormWrapperProps = {
  meme: Meme
  children: React.ReactNode
}

function getTranslatedMetadataByLocale(
  meme: Meme,
  locale: Locales
): MemeMetadata {
  if (locale === 'en') {
    return {
      name: meme.name,
      keywords: meme.keywords
    }
  }

  const translation = meme.translations.find((t) => {
    return t.locale === locale
  })

  return {
    name: translation?.name || '',
    keywords: translation?.keywords || []
  }
}

const FormWrapper = ({ meme, children }: FormWrapperProps) => {
  const ratiotedTextboxes = useRatiotedTextboxes()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const methods = useForm<UpdateMemeSchema>({
    resolver: zodResolver(updateMemeSchema),
    mode: 'all',
    defaultValues: {
      en: getTranslatedMetadataByLocale(meme, 'en'),
      fr: getTranslatedMetadataByLocale(meme, 'fr')
    } as UpdateMemeSchema
  })

  const updateMemeMutation = useMutation({
    mutationFn: (data: UpdateMemeSchema) => {
      const { en, ...translations } = data

      return updateMeme(meme.id, {
        meme: {
          ...meme,
          name: en.name,
          keywords: en.keywords
        },
        translations: getKeys(translations).map((localeKey) => {
          const translation = data[localeKey]

          return {
            locale: localeKey,
            name: translation.name,
            keywords: translation.keywords
          }
        }),
        textboxes: ratiotedTextboxes().map((textbox) => {
          return {
            ...textbox.properties,
            value: ''
          }
        })
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queries.meme.getOne(meme.id).queryKey
      })
      enqueueSnackbar('Mise à jour effectuée', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Une erreur inconnue est survenue', { variant: 'error' })
    }
  })

  const onSubmit: SubmitHandler<UpdateMemeSchema> = async (data) => {
    if (updateMemeMutation.isPending) {
      return
    }

    await updateMemeMutation.mutateAsync(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default FormWrapper
