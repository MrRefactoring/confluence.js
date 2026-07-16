import { z } from 'zod';
import { ContentBlueprintDraftSchema } from '../models';

export const PublishSharedDraftSchema = z
  .object({
    /**
     * The ID of the draft page that was created from a blueprint. You can find the `draftId` in the Confluence
     * application by opening the draft page and checking the page URL.
     */
    draftId: z.string(),
    /**
     * The status of the content to be updated, i.e. the draft. This is set to 'draft' by default, so you shouldn't need
     * to specify it.
     */
    status: z.string().optional(),
    /**
     * A multi-value parameter indicating which properties of the content to expand.
     *
     * - `childTypes.all` returns whether the content has attachments, comments, or child pages/whiteboards. Use this if
     *   you only need to check whether the content has children of a particular type.
     * - `childTypes.attachment` returns whether the content has attachments.
     * - `childTypes.comment` returns whether the content has comments.
     * - `childTypes.page` returns whether the content has child pages.
     * - `childTypes.whiteboard` returns whether the content has child whiteboards.
     * - `childTypes.database` returns whether the content has child databases.
     * - `childTypes.embed` returns whether the content has child embeds (smartlinks).
     * - `childTypes.folder` returns whether the content has child folders.
     * - `container` returns the space that the content is in. This is the same as the information returned by [Get
     *   space](#api-space-spaceKey-get).
     * - `metadata.currentuser` returns information about the current user in relation to the content, including when they
     *   last viewed it, modified it, contributed to it, or added it as a favorite.
     * - `metadata.properties` returns content properties that have been set via the Confluence REST API.
     * - `metadata.labels` returns the labels that have been added to the content.
     * - `metadata.frontend` this property is only used by Atlassian.
     * - `operations` returns the operations for the content, which are used when setting permissions.
     * - `children.page` returns pages that are descendants at the level immediately below the content.
     * - `children.whiteboard` returns whiteboards that are descendants at the level immediately below the content.
     * - `children.database` returns databases that are descendants at the level immediately below the content.
     * - `children.embed` returns embeds (smartlinks) that are descendants at the level immediately below the content.
     * - `children.folder` returns folders that are descendants at the level immediately below the content.
     * - `children.attachment` returns all attachments for the content.
     * - `children.comment` returns all comments on the content.
     * - `restrictions.read.restrictions.user` returns the users that have permission to read the content.
     * - `restrictions.read.restrictions.group` returns the groups that have permission to read the content. Note that
     *   this may return deleted groups, because deleting a group doesn't remove associated restrictions.
     * - `restrictions.update.restrictions.user` returns the users that have permission to update the content.
     * - `restrictions.update.restrictions.group` returns the groups that have permission to update the content. Note that
     *   this may return deleted groups because deleting a group doesn't remove associated restrictions.
     * - `history` returns the history of the content, including the date it was created.
     * - `history.lastUpdated` returns information about the most recent update of the content, including who updated it
     *   and when it was updated.
     * - `history.previousVersion` returns information about the update prior to the current content update.
     * - `history.contributors` returns all of the users who have contributed to the content.
     * - `history.nextVersion` returns information about the update after to the current content update.
     * - `ancestors` returns the parent content, if the content is a page or whiteboard.
     * - `body` returns the body of the content in different formats, including the editor format, view format, and export
     *   format.
     * - `body.storage` returns the body of content in storage format.
     * - `body.view` returns the body of content in view format.
     * - `version` returns information about the most recent update of the content, including who updated it and when it
     *   was updated.
     * - `descendants.page` returns pages that are descendants at any level below the content.
     * - `descendants.whiteboard` returns whiteboards that are descendants at any level below the content.
     * - `descendants.database` returns databases that are descendants at any level below the content.
     * - `descendants.embed` returns embeds (smartlinks) that are descendants at any level below the content.
     * - `descendants.folder` returns folders that are descendants at any level below the content.
     * - `descendants.attachment` returns all attachments for the content, same as `children.attachment`.
     * - `descendants.comment` returns all comments on the content, same as `children.comment`.
     * - `space` returns the space that the content is in. This is the same as the information returned by [Get
     *   space](#api-space-spaceKey-get).
     *
     * In addition, the following comment-specific expansions can be used:
     *
     * - `extensions.inlineProperties` returns inline comment-specific properties.
     * - `extensions.resolution` returns the resolution status of each comment.
     */
    expand: z.array(z.string()).optional(),
  })
  .extend(ContentBlueprintDraftSchema.shape);

export type PublishSharedDraft = z.input<typeof PublishSharedDraftSchema>;
